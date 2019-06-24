import { Decoration, Range, Mark } from 'slate';

export const matchAll = (regex, text) => {
  const matches = [];
  let match = null;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    matches.push(match.index);
  }
  return matches;
};

const extractSentence = (offset, indices) => {
  const absOffset = offset < 0 ? 0 : offset;
  const sortedIndices = indices.sort((a, b) => a - b);

  let start = indices[0];
  let end = indices[indices.length - 1];

  let i = 0;
  indices.forEach((value) => {
    if (absOffset > value) {
      i += 1;
    }
  });

  if (i === 0) {
    return {
      start,
      end: indices[1],
    };
  }

  if (i === indices.length) {
    return {
      start: indices[i - 2],
      end: indices[i - 1],
    };
  }

  start = sortedIndices[i - 1] || start;
  end = sortedIndices[i] || end;

  return {
    start,
    end,
  };
};

const debug = (text) => {
  console.log(JSON.stringify(text, null, '\t'));
};

const setFocus = (event, editor) => {
  const { anchor, focus } = editor.value.selection;
  const { anchorText } = editor.value;

  let range = Range.create({
    anchor,
    focus,
  });

  const matches = matchAll(/\./gi, anchorText.text);
  const indices = [...new Set([0, ...matches, anchorText.text.length - 1])];

  const offset = event.type === 'keydown' ? anchor.offset - 1 : anchor.offset;

  const data = extractSentence(offset, indices, anchorText.text);

  debug(data);

  // range = event.type === 'keydown' ? range.moveFocusBackward(2) : range.moveFocusBackward(3);

  range = range.moveAnchorTo(anchor.path, data.start);
  range = range.moveFocusTo(focus.path, data.end);

  editor.withoutSaving(() => {
    editor.addAnnotation({
      key: 1,
      type: 'highlight',
      anchor: range.anchor,
      focus: range.focus,
    });
  });

  // const node = blocks.getNode(anchor.key);

  // console.log(blocks);
};

function focusModePlugin(options) {
  const { type, key } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyUp(event, editor, next) {
      // If it doesn't match our `key`, let other plugins handle it.
      setFocus(event, editor);

      return next();
    },
    onClick(event, editor, next) {
      //   const selectedNodeKey = editor.value.selection.anchor.key;
      // const { marks } = editor.value;

      // marks.forEach((mark) => {
      //   console.log(mark.type);
      // });

      setFocus(event, editor);
      return next();
    },
  };
}

export default focusModePlugin;
