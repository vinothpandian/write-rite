import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { compose } from 'recompose';
import ContentEditable from 'react-contenteditable';
import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import { matchAll, extractSentence } from '../../utils';
import './writePage.scss';

const WritePage = ({ user, firebase, match }) => {
  const [writing, setWriting] = React.useState(
    '<div>Lorem ipsum dolor sit amet, <span id="focused-text" >consetetur sadipscing elitr,</span> sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.&nbsp; &nbsp;</div><div><br></div><div>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.&nbsp; &nbsp;</div><div><br></div><div>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.&nbsp; &nbsp;</div><div><br></div><div>This is a test. Yes it is. Oh yes. Sure sure. Cool.</div>',
  );

  const contentEditableRef = React.useRef(null);

  const { id } = match.params;

  const onKeyPress = (event) => {
    if (
      (window.navigator.platform.match('Mac') ? event.metaKey : event.ctrlKey)
      && event.keyCode === 83
    ) {
      event.preventDefault();

      firebase.saveWriting(user, id, writing);
    }
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

  const setFocus = () => {
    // Get contenteditable node
    const nodeRef = contentEditableRef.current;

    // Get Node with focused text
    const currentHighlightedNode = nodeRef.querySelector('span#focused-text');

    // If focused text exist then move it's text to parent and remove it
    if (currentHighlightedNode) {
      appendToParentAndRemove(currentHighlightedNode);
    }

    // Get the current cursor position and it's parent
    const selection = window.getSelection();
    const { anchorNode, anchorOffset } = selection;

    // if cursor's parent is contenteditable node then do nothing
    if (anchorNode.parentElement === nodeRef) {
      return;
    }

    // Get the innerHTML of cursor's parent and identify all "."
    const { innerHTML: textContent } = anchorNode.parentElement;
    const matches = matchAll(/\./gi, textContent);
    const indicies = [0, ...matches, textContent.length];

    // Split the text to currentline with cursor postion, before it and after it
    const {
      begin, middle, end, newCaretPosition,
    } = extractSentence(
      anchorOffset,
      indicies,
      textContent,
    );

    // Edge case: remove text with &nbsp; and add space instead
    const spacelessEnd = end.replace(/&nbsp;/gi, '');

    // Create new focused node and fill it's innerHTML and id
    const focusedNode = document.createElement('span');
    focusedNode.innerHTML = middle || ' ';
    focusedNode.id = 'focused-text';

    // Create a new div to add text
    const newNode = document.createElement('div');
    newNode.append(begin, focusedNode, spacelessEnd);
    newNode.normalize();

    // Replace the cursor's parent with newly created node
    nodeRef.replaceChild(newNode, anchorNode.parentElement);

    // Reset the cursor position to the click position
    const range = document.createRange();
    range.setStart(focusedNode.firstChild, newCaretPosition);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setWriting(value);
  };

  // React.useEffect(() => {
  //   async function fetchAll() {
  //     if (user) {
  //       const data = await firebase.getWriting(user, id);
  //       setWriting(data);
  //     }
  //   }

  //   fetchAll();
  // }, [user, firebase, id]);

  return (
    <div className="wrapper1">
      <div className="wrapper2">
        <ContentEditable
          innerRef={contentEditableRef}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          className="contentEditableContainer"
          html={writing}
          tagName="div"
          onChange={handleChange}
          onKeyDown={onKeyPress}
          onClick={(event) => {
            if (event.target.id !== 'focused-text') {
              setFocus();
            }
          }}
        />
      </div>
    </div>
  );
};

WritePage.propTypes = {
  user: PropTypes.string,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

WritePage.defaultProps = {
  user: '',
};

const condition = user => !!user;

export default compose(
  withFirebase,
  withAuthUser('uid'),
  withAuthorization(condition),
)(WritePage);
