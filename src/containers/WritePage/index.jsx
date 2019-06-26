import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { compose } from 'recompose';
import { withRouter } from 'react-router';
import { Value } from 'slate';
import customProps from '../../proptypes';

import Firebase, { withFirebase } from '../../contexts/Firebase';
import { withAuthorization, withAuthUser } from '../../contexts/Session';

import './writePage.scss';
import { WritingAreaContainer, WritingAreaWrapper, ContentEditable } from './components';
import FocusedText from '../../components/FocusedText';

import focusModePlugin, { setFocus } from './focusModePlugin';
import { emptyValue } from '../../utils';

import { storeLocally, getWritingLocally } from '../../utils/localDB';
import { withTheme } from '../../contexts/Theme';

const plugins = [focusModePlugin()];

const WritePage = ({
  theme, user, firebase, match,
}) => {
  const editorRef = React.useRef(null);
  const [writing, setWriting] = React.useState(emptyValue);
  const { id } = match.params;

  React.useEffect(() => {
    async function fetchAll() {
      if (user) {
        const {
          timestamp: firebaseTimestamp,
          writing: firebaseWriting,
        } = await firebase.getWriting(id);

        const { timestamp: localTimestamp, writing: localWriting } = getWritingLocally(id);

        let value = firebaseTimestamp > localTimestamp ? firebaseWriting : localWriting;

        value = Value.fromJSON(value);

        setWriting(value);

        const { editor } = editorRef.current;

        editor
          .moveToRangeOfDocument()
          .moveToEnd()
          .focus();

        setFocus(editor);
      }
    }

    function cleanUp() {
      if (user && editorRef) {
        const { value } = editorRef.current.editor;
        firebase.saveWriting(id, value);
      }
    }

    fetchAll();

    return cleanUp;
  }, [user, firebase, id]);

  const renderAnnotation = (props, editor, next) => {
    // eslint-disable-next-line
    const { children, annotation, attributes } = props;

    switch (annotation.type) {
      case 'focused-text':
        return <FocusedText attributes={attributes}>{children}</FocusedText>;
      default:
        return next();
    }
  };

  const onKeyDown = (event, editor, next) => {
    const { value } = editor;

    if (event.key !== 's' || !event.ctrlKey) return next();
    event.preventDefault();

    firebase.saveWriting(id, value);

    return true;
  };

  const onKeyUp = (event, editor, next) => {
    const { value } = editor;
    storeLocally(id, value.toJSON());
    return next();
  };

  return (
    <WritingAreaContainer>
      <WritingAreaWrapper themeClass={theme.className}>
        <ContentEditable
          ref={editorRef}
          autoFocus
          spellCheck={false}
          placeholder="Write here.."
          value={writing}
          plugins={plugins}
          renderAnnotation={renderAnnotation}
          onChange={({ value }) => {
            setWriting(value);
          }}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
        />
      </WritingAreaWrapper>
    </WritingAreaContainer>
  );
};

WritePage.propTypes = {
  theme: customProps.theme.isRequired,
  user: PropTypes.string,
  firebase: PropTypes.instanceOf(Firebase).isRequired,
  match: ReactRouterPropTypes.match.isRequired,
};

WritePage.defaultProps = {
  user: '',
};

const condition = user => !!user;

export default compose(
  withTheme,
  withFirebase,
  withRouter,
  withAuthUser('uid'),
  withAuthorization(condition),
)(WritePage);
