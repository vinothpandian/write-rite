import * as React from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';

import { compose } from 'recompose';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import { withAuthorization, withAuthUser } from '../../contexts/Session';
import Firebase, { withFirebase } from '../../contexts/Firebase';
import './writePage.scss';

const FocusedText = ({ attributes, children }) => (
  <div {...attributes} id="focused-text" style={{ color: 'red' }}>
    {children}
  </div>
);

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'focusedText',
        nodes: [
          {
            object: 'text',
            text: 'A line of text in a paragraph.',
          },
        ],
      },
    ],
  },
});

const WritePage = ({ user, firebase, match }) => {
  const [writing, setWriting] = React.useState(initialValue);

  // React.useEffect(() => {
  //   async function fetchAll() {
  //     if (user) {
  //       const data = await firebase.getWriting(user, id);
  //       setWriting(data);
  //     }
  //   }

  //   fetchAll();
  // }, [user, firebase, id]);

  // Add a `renderBlock` method to render a `CodeNode` for code blocks.
  const renderBlock = (props, editor, next) => {
    switch (props.node.type) {
      case 'focusedText':
        return <FocusedText {...props} />;
      default:
        return next();
    }
  };

  return (
    <div className="wrapper1">
      <div className="wrapper2">
        <Editor
          className="contentEditableContainer"
          value={writing}
          renderBlock={renderBlock}
          onChange={({ value }) => {
            console.log(JSON.stringify(value.document.nodes));

            setWriting(value);
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
