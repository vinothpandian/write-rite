import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import {
  Editor,
  EditorState,
  ContentState,
  Modifier,
  DefaultDraftBlockRenderMap,
  RichUtils,
} from 'draft-js';

import Immutable from 'immutable';
// import 'draft-js/dist/Draft.css';

import { compose } from 'recompose';

import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import './writePage.scss';

const FocusedText = ({ children }) => (
  <div style={{ color: 'red' }} id="focused-text">
    {children}
  </div>
);

const WritePage = ({ user, firebase, match }) => {
  const [writing, setWriting] = React.useState(
    EditorState.createWithContent(
      ContentState.createFromText(
        'Hello World!. \n \n This is vinoth. How are you?! Hello World!. This is vinoth. How are you?! Hello World!. This is vinoth. How are you?! Hello World!. This is vinoth. How are you?! Hello World!. This is vinoth. How are you?!',
      ),
    ),
  );

  const blockRenderMap = Immutable.Map({
    FocusedText: {
      element: 'div',
      wrapper: <FocusedText />,
    },
  });

  // Include 'paragraph' as a valid block and updated the unstyled element but
  // keep support for other draft default block types
  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(blockRenderMap);

  const styleMap = {
    focusText: {
      background: 'red',
    },
  };

  return (
    <div className="wrapper1">
      <Editor
        placeholder="Write here.."
        editorState={writing}
        customStyleMap={styleMap}
        onChange={(editorState) => {
          const currentContent = editorState.getCurrentContent();
          const selection = editorState.getSelection();

          const updatedContentState = Modifier.applyInlineStyle(
            currentContent,
            selection,
            'focusText',
          );

          const nextEditorState = EditorState.push(
            editorState,
            updatedContentState,
            'change-inline-style',
          );

          setWriting(nextEditorState);

          console.log(editorState.getCurrentInlineStyle().toJS());
        }}
      />
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
