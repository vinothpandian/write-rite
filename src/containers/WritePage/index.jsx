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
    '<div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.&nbsp; &nbsp;</div><div><br></div><div>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.&nbsp; &nbsp;</div><div><br></div><div>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.&nbsp; &nbsp;</div><div><br></div><div>This is a test. Yes it is. Oh yes. Sure sure. Cool.</div>',
  );

  const contentEditableRef = React.useRef(null);

  const { id } = match.params;

  /* $(document).on('click', '#myButton', function () {
    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)
      var str = $('#myDiv').html().replace(/<br>/gi, '').replace(/<div>/gi, '<br>').replace(/<\/div>/gi, '');
    else if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1)
      var str = $('#myDiv').html().replace(/<\/br>/gi, '').replace(/<br>/gi, '<br>').replace(/<\/br>/gi, '');
    else if (navigator.userAgent.toLowerCase().indexOf("msie") == -1)
      var str = $('#myDiv').html().replace(/<br>/gi, '').replace(/<p>/gi, '<br>').replace(/<\/p>/gi, '');
    $('#myDiv2').removeClass('invisible').addClass('visible').text(str);
    $('#myDiv3').removeClass('invisible').addClass('visible').html(str); */

  const onKeyPress = (event) => {
    if (
      (window.navigator.platform.match('Mac') ? event.metaKey : event.ctrlKey)
      && event.keyCode === 83
    ) {
      event.preventDefault();

      firebase.saveWriting(user, id, writing);
    }
  };

  const setFocus = () => {
    const selection = window.getSelection();

    const { anchorNode, anchorOffset } = selection;
    const { innerHTML } = anchorNode.parentElement;

    const text = innerHTML.replace(/<em id="focused-text">/gi, '').replace(/\/em>gi/, '');

    console.log(text);

    if (anchorOffset > 0) {
      const matches = matchAll(/\./gi, text);
      const indicies = [0, ...matches, text.length];

      const [begin, middle, end] = extractSentence(anchorOffset, indicies, text);

      anchorNode.parentNode.innerHTML = `${begin}<em id="focused-text">${middle}</em>${end}`;
    }
  };

  const handleChange = (event) => {
    const userAgent = navigator.userAgent.toLowerCase();
    const { value } = event.target;

    setFocus();

    // value = value.replace(/<br>/gi, '');

    // const parser = new DOMParser();
    // const doc = parser.parseFromString(value, 'text/html');
    // const divs = doc.querySelectorAll('div');

    // const lastDiv = divs[divs.length - 1];
    // const { innerHTML } = lastDiv;

    // lastDiv.innerHTML = `booyea ${innerHTML}`;

    // value = value
    //   .replace(/<div>/gi, '')
    //   .replace(/<\/div>/gi, '')
    //   .replace(/<br>/gi, '<div><br/></div>');

    // console.log(value);

    switch (true) {
      case userAgent.includes('chrome'):
        // console.log(value);
        setWriting(value);
        break;
      case userAgent.includes('firefox'):
        setWriting(value);
        break;
      case userAgent.includes('msie'):
        setWriting(value);
        break;
      default:
        setWriting(value);
        break;
    }
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
          onClick={() => {
            setFocus();
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
