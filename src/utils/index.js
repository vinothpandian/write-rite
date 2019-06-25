import { Value } from 'slate';

export const debugValue = Value.fromJSON({
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

export const emptyValue = Value.fromJSON({
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

export function toggleFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen
    || docEl.mozRequestFullScreen
    || docEl.webkitRequestFullScreen
    || docEl.msRequestFullscreen;
  const cancelFullScreen = doc.exitFullscreen
    || doc.mozCancelFullScreen
    || doc.webkitExitFullscreen
    || doc.msExitFullscreen;

  if (
    !doc.fullscreenElement
    && !doc.mozFullScreenElement
    && !doc.webkitFullscreenElement
    && !doc.msFullscreenElement
  ) {
    requestFullScreen.call(docEl);
  } else {
    cancelFullScreen.call(doc);
  }
}
