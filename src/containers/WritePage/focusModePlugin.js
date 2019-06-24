import { Range } from 'slate';

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
      end: indices[i - 1] + 1,
    };
  }

  start = sortedIndices[i - 1] || start;
  end = sortedIndices[i] || end;

  return {
    start,
    end,
  };
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
};

function focusModePlugin(options) {
  return {
    onKeyUp(event, editor, next) {
      setFocus(event, editor);
      return next();
    },
    onClick(event, editor, next) {
      setFocus(event, editor);
      return next();
    },
  };
}

export default focusModePlugin;
