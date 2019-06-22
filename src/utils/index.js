export const matchAll = (regex, text) => {
  const matches = [];
  let match = null;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    matches.push(match.index + 1);
  }
  return matches;
};

export const extractSentence = (offset, indices, text) => {
  const sortedIndices = indices.sort((a, b) => a - b);

  const textStart = sortedIndices[0];
  const textEnd = sortedIndices[sortedIndices.length - 1];

  let i = 0;
  while (sortedIndices[i] <= offset) {
    i += 1;
  }

  const start = sortedIndices[i - 1] || textStart;
  const end = sortedIndices[i] || textEnd;

  return {
    begin: text.slice(textStart, start),
    middle: text.slice(start, end),
    end: text.slice(end),
    newCaretPosition: offset - start,
  };
};
