import dompurify from 'dompurify';

function getCaretCharacterOffsetWithin(element) {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  let sel;
  if (typeof win.getSelection !== 'undefined') {
    sel = win.getSelection();
    if (sel.rangeCount > 0) {
      const range = win.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
    // eslint-disable-next-line
  } else if ((sel = doc.selection) && sel.type != 'Control') {
    const textRange = sel.createRange();
    const preCaretTextRange = doc.body.createTextRange();
    preCaretTextRange.moveToElementText(element);
    preCaretTextRange.setEndPoint('EndToEnd', textRange);
    caretOffset = preCaretTextRange.text.length;
  }
  return caretOffset;
}

export const matchAll = (regex, text) => {
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
  const { textContent: innerHTML } = cursorParent;

  const purifiedHTML = dompurify.sanitize(innerHTML);

  const matches = matchAll(/\./gi, purifiedHTML);
  const indices = [0, ...matches, purifiedHTML.length];

  // Split the text to currentline with cursor postion, before it and after it
  const { newCaretPosition, ...purifiedHTMLSplit } = extractSentence(
    cursorOffset,
    indices,
    purifiedHTML,
  );

  const { begin, middle, end } = purifiedHTMLSplit;

  // Edge case: remove text with &nbsp; and add space instead
  const spacelessEnd = end.replace(/&nbsp;/gi, '');

  // Create new focused node and fill it's innerHTML and id
  const focusedNode = document.createElement('span');
  focusedNode.textContent = middle;
  focusedNode.id = 'focused-text';

  // Create a new div to add text
  const node = document.createElement('div');
  node.append(begin, focusedNode, spacelessEnd);
  node.normalize();

  return { focusedNode, node, newCaretPosition };
};

const findAndProcessFocusedNode = (contentEditableNode) => {
  // Get Node with focused text
  const focusedNodes = contentEditableNode.querySelectorAll('span#focused-text');

  // If focused text exist then move it's text to parent and remove it
  focusedNodes.forEach((node) => {
    appendToParentAndRemove(node);
  });
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

export const setFocusOnClick = (ref) => {
  // Get contenteditable node
  const contentEditableNode = ref.current;
  // Get the current cursor position and it's parent
  const selection = window.getSelection();

  const { caretOffset, caretNode } = getCaretPosition();

  console.log(caretNode.innerHTML[caretOffset - 1]);
  if (caretNode.innerHTML[caretOffset - 1] === '.') {
    return;
  }

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

export const setFocusOnInput = (ref, event, callback) => {
  const { value } = event.target;
  const { data } = event.nativeEvent;
  const contentEditableNode = ref.current;

  const { caretOffset, caretNode } = getCaretPosition();

  if (caretNode.id === 'focused-text' && data !== '.') {
    callback(dompurify.sanitize(value));
  } else if (data === '.') {
    // if cursor's parent is contenteditable node then do nothing
    if (caretNode === contentEditableNode) {
      return;
    }
    findAndProcessFocusedNode(contentEditableNode);
  } else {
    const nextValue = dompurify.sanitize(contentEditableNode.innerHTML);
    const matches = matchAll(/\./gi, nextValue);

    const end = matches.reverse()[0];

    if (matches && end) {
      findAndProcessFocusedNode(contentEditableNode);

      if (caretNode === contentEditableNode) {
        return;
      }

      const dom = new DOMParser();
      const doc = dom.parseFromString(nextValue, 'text/html');

      let i = 0;

      contentEditableNode.childNodes.forEach((node, index) => {
        if (node === caretNode) {
          i = index;
        }
      });

      const newCaretNode = doc.body.childNodes[i];

      const { node, focusedNode, newCaretPosition } = createFocusedNode(caretOffset, newCaretNode);

      doc.body.replaceChild(node, newCaretNode);
      console.log(doc.body);

      // setCaretPosition(selection, focusedNode, newCaretPosition);

      callback(doc.body.innerHTML);
    }
  }

  // let nextValue = dompurify.sanitize(value);

  // const matches = matchAll(/\./gi, nextValue);

  // const end = matches.reverse()[0];

  // console.log(matches, end);

  // if (end) {
  //   const focusedText = nextValue.slice(end).replace(/<\/div>/gi, '');
  //   nextValue = `${nextValue.slice(0, end)}<span id="focused-text">${focusedText}</span></div>`;
  // }
};
