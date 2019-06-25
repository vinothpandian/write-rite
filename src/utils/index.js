import { Value } from 'slate';

const debugValue = Value.fromJSON({
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

const emptyValue = Value.fromJSON({
  document: {
    nodes: [
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
    ],
  },
});

// eslint-disable-next-line
export { debugValue, emptyValue };
