const matchAll = (regex, text) => {
  const matches = [];
  let match = null;
  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(text)) !== null) {
    matches.push(match.index + 1);
  }
  return matches;
};

const extractSentence = (offset, indices, text) => {
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

const appendToParentAndRemove = (currentHighlightedNode) => {
  const { parentNode } = currentHighlightedNode;

  // copy content to parent if focused node has text
  if (currentHighlightedNode.firstChild) {
    parentNode.insertBefore(currentHighlightedNode.firstChild, currentHighlightedNode);
  }

  parentNode.removeChild(currentHighlightedNode);
  parentNode.normalize();
};

const setCaretPosition = (selection, node, position) => {
  // Reset the cursor position to the click position
  const range = document.createRange();
  range.setStart(node.firstChild, position);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

const createFocusedNode = (cursorOffset, cursorParent) => {
  // Get the innerHTML of cursor's parent and identify all "."
  const { innerHTML } = cursorParent;
  const matches = matchAll(/\./gi, innerHTML);
  const indices = [0, ...matches, innerHTML.length];

  // Split the text to currentline with cursor postion, before it and after it
  const { newCaretPosition, ...innerHTMLSplit } = extractSentence(cursorOffset, indices, innerHTML);

  const { begin, middle, end } = innerHTMLSplit;

  // Edge case: remove text with &nbsp; and add space instead
  const spacelessEnd = end.replace(/&nbsp;/gi, '');

  // Create new focused node and fill it's innerHTML and id
  const focusedNode = document.createElement('span');
  focusedNode.innerHTML = middle || ' ';
  focusedNode.id = 'focused-text';

  // Create a new div to add text
  const node = document.createElement('div');
  node.append(begin, focusedNode, spacelessEnd);
  node.normalize();

  return { focusedNode, node, newCaretPosition };
};

const findAndProcessFocusedNode = (contentEditableNode) => {
  // Get Node with focused text
  const currentHighlightedNode = contentEditableNode.querySelector('span#focused-text');

  // If focused text exist then move it's text to parent and remove it
  if (currentHighlightedNode) {
    appendToParentAndRemove(currentHighlightedNode);
  }
};

const setFocusOnClick = (ref) => {
  // Get contenteditable node
  const contentEditableNode = ref.current;

  findAndProcessFocusedNode(contentEditableNode);

  // Get the current cursor position and it's parent
  const selection = window.getSelection();
  const { anchorNode, anchorOffset } = selection;
  const { parentElement } = anchorNode;

  // if cursor's parent is contenteditable node then do nothing
  if (parentElement === contentEditableNode) {
    return;
  }

  const { node, focusedNode, newCaretPosition } = createFocusedNode(anchorOffset, parentElement);

  // Replace the cursor's parent with newly created node
  contentEditableNode.replaceChild(node, parentElement);

  setCaretPosition(selection, focusedNode, newCaretPosition);
};

const setFocusOnInput = (ref) => {
  console.log('handle input focus');
};

const setFocus = (eventType, ref) => {
  switch (eventType) {
    case 'click':
      setFocusOnClick(ref);
      break;
    case 'input':
      setFocusOnInput(ref);
      break;
    default:
      console.log('New event === write new function');
      break;
  }
};

export default setFocus;
