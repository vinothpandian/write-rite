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

const extractSentence = (offset, indices, text) => {
  const sortedIndices = indices.sort((a, b) => a - b);

  console.log(offset, indices);

  const textStart = sortedIndices[0];
  const textEnd = sortedIndices[sortedIndices.length - 1];

  let i = 0;
  while (sortedIndices[i] < offset) {
    i += 1;
  }

  const startIndex = sortedIndices[i - 1] || textStart;
  const endIndex = sortedIndices[i] || textEnd;

  return {
    startIndex,
    endIndex,
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
  const indices = [0, ...matches, anchorText.text.length];

  const offset = event.type === 'keydown' ? anchor.offset - 1 : anchor.offset;

  const data = extractSentence(offset, indices, anchorText.text);

  debug(data);

  // range = event.type === 'keydown' ? range.moveFocusBackward(2) : range.moveFocusBackward(3);

  range = range.moveAnchorTo(anchor.path, data.startIndex);
  range = range.moveFocusTo(focus.path, data.endIndex);

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
    onKeyDown(event, editor, next) {
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
