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

const plugins = [focusModePlugin()];

const WritePage = () => {
  const [writing, setWriting] = React.useState(emptyValue);

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
        />
      </div>
    </div>
  );
};

export default WritePage;
