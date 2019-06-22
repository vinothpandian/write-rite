export const matchAll = (regex, text) => {
  const matches = [];
  let match = null;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    matches.push(match.index);
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

  let start = sortedIndices[i - 1] || textStart;
  let end = sortedIndices[i] || textEnd;

  start = start === 0 ? start : start + 1;
  end = end > textEnd ? end : end + 1;

  return [text.slice(textStart, start), text.slice(start, end), text.slice(end)];
};
