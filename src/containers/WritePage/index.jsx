import * as React from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

import './writePage.scss';
import focusModePlugin from './focusModePlugin';

const emptyValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim.',
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text: '',
          },
        ],
      },
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            text:
              'Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Donec ac odio tempor orci dapibus. Quis enim lobortis scelerisque fermentum dui faucibus in ornare. Elit sed vulputate mi sit amet mauris commodo. Viverra nam libero justo laoreet sit amet cursus. Morbi tempus iaculis urna id volutpat lacus laoreet non curabitur. Rutrum tellus pellentesque eu tincidunt.',
          },
        ],
      },
    ],
  },
});

const boldPlugin = focusModePlugin({
  type: 'bold',
  key: 'b',
});

const plugins = [boldPlugin];

const WritePage = () => {
  const [writing, setWriting] = React.useState(emptyValue);

  const renderMark = (props, editor, next) => {
    switch (props.mark.type) {
      case 'bold':
        return <strong {...props.attributes}>{props.children}</strong>;
      default:
        return next();
    }
  };

  const renderAnnotation = (props, editor, next) => {
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

  return (
    <div className="wrapper1">
      <div className="wrapper2">
        <Editor
          className="contentEditableContainer"
          plugins={plugins}
          renderAnnotation={renderAnnotation}
          placeholder="Write here.."
          value={writing}
          autoFocus
          spellCheck={false}
          onChange={({ value }) => {
            setWriting(value);
          }}
        />
      </div>
    </div>
  );
};

export default WritePage;
