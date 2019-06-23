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

  const startIndex = sortedIndices[i - 1] || textStart;
  const endIndex = sortedIndices[i] || textEnd;

  const begin = text.slice(textStart, startIndex);
  let middle = text.slice(startIndex, endIndex);
  const end = text.slice(endIndex);

  const newCaretPosition = offset - startIndex;

  if (!middle) {
    if (begin[begin.length - 1] === '.') {
      middle = ' ';
    } else {
      const newExtractedData = extractSentence(offset - 1, indices, text);

      return {
        ...newExtractedData,
        newCaretPosition: newExtractedData.newCaretPosition + 1,
      };
    }
  }

  return {
    begin,
    middle,
    end,
    newCaretPosition,
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

  let caretPosition = position;

  const range = document.createRange();

  if (node.firstChild.length < position) {
    caretPosition = node.firstChild.length;
  }

  range.setStart(node.firstChild, caretPosition);
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
  focusedNode.innerHTML = middle;
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

function getCaretPosition() {
  if (window.getSelection && window.getSelection().getRangeAt) {
    const range = window.getSelection().getRangeAt(0);
    const selectedObj = window.getSelection();
    let rangeCount = 0;
    const { parentNode } = selectedObj.anchorNode;
    const { childNodes } = parentNode;

    for (let i = 0; i < childNodes.length; i += 1) {
      if (childNodes[i] === selectedObj.anchorNode) {
        break;
      }
      if (childNodes[i].outerHTML) rangeCount += childNodes[i].outerHTML.length;
      else if (childNodes[i].nodeType === 3) {
        rangeCount += childNodes[i].textContent.length;
      }
    }
    return {
      caretOffset: range.startOffset + rangeCount,
      caretNode: parentNode,
    };
  }
  return {
    caretOffset: -1,
    caretNode: null,
  };
}

const setFocusOnClick = (ref) => {
  // Get contenteditable node
  const contentEditableNode = ref.current;
  // Get the current cursor position and it's parent
  const selection = window.getSelection();

  const { caretOffset, caretNode } = getCaretPosition();

  console.log(caretOffset, caretNode);

  // if cursor's parent is contenteditable node then do nothing
  if (caretNode === contentEditableNode || caretNode.id === 'focused-text') {
    return;
  }

  findAndProcessFocusedNode(contentEditableNode);

  const { node, focusedNode, newCaretPosition } = createFocusedNode(caretOffset, caretNode);

  // Replace the cursor's parent with newly created node
  contentEditableNode.replaceChild(node, caretNode);

  setCaretPosition(selection, focusedNode, newCaretPosition);
};

const setFocusOnInput = (ref) => {
  const contentEditableNode = ref.current;

  const selection = window.getSelection();

  const { anchorNode, anchorOffset } = selection;
  const { parentElement } = anchorNode;
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
      // eslint-disable-next-line no-console
      console.info('New event === write new function');
      break;
  }
};

export default setFocus;
