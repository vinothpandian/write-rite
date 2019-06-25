import * as React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Editor } from 'slate-react';
import { Value } from 'slate';

import ReactRouterPropTypes from 'react-router-prop-types';

import { compose } from 'recompose';
import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';

import './writePage.scss';
import focusModePlugin from './focusModePlugin';
import { emptyValue } from '../../utils';
import { storeLocally, getWritingLocally } from '../../utils/localDB';

const plugins = [focusModePlugin()];

const WritePage = ({ user, firebase, match }) => {
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
      case 'highlight':
        return (
          <span {...attributes} className="focused-text">
            {children}
          </span>
        );
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
    <div className="wrapper1">
      <div className="wrapper2">
        <Editor
          ref={editorRef}
          autoFocus
          spellCheck={false}
          className="contentEditableContainer"
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
  withRouter,
  withAuthUser('uid'),
  withAuthorization(condition),
)(WritePage);
