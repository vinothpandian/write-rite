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

  let start = sortedIndices[0];
  let end = sortedIndices[sortedIndices.length - 1];

  let i = 0;

  while (absOffset > sortedIndices[i]) {
    i += 1;
  }

  start = sortedIndices[i - 1];
  end = sortedIndices[i];

  start = start || 0;
  end = end === 0 ? sortedIndices[1] : end;

  return {
    start,
    end,
  };
};

export const setFocus = (editor) => {
  const { anchor, focus } = editor.value.selection;
  const { text } = editor.value.anchorText;
  const { offset } = anchor;

  let range = Range.create({
    anchor,
    focus,
  });

  const matches = matchAll(/\./gi, text);
  const indices = [...new Set([0, ...matches, text.length])];

  const data = extractSentence(offset, indices, text);

  range = range.moveAnchorTo(anchor.path, data.start);
  range = range.moveFocusTo(focus.path, data.end);

  editor.withoutSaving(() => {
    editor.addAnnotation({
      key: 'focused-text',
      type: 'focused-text',
      anchor: range.anchor,
      focus: range.focus,
    });
  });
};

function focusModePlugin(options) {
  return {
    onKeyUp(event, editor, next) {
      setFocus(editor);
      return next();
    },
    onClick(event, editor, next) {
      setFocus(editor);
      return next();
    },
  };
}

export default focusModePlugin;
