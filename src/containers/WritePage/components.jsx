import { Editor } from 'slate-react';
import styled from '@emotion/styled';

export const WritingAreaContainer = styled.main({
  height: '50vh',
  overflowY: 'auto',
});

export const WritingAreaWrapper = styled.section({
  minHeight: '100%',
  display: 'flex',
  overflow: 'hidden',
  //   position: relative;
});

export const ContentEditable = styled(Editor)({
  fontFamily: "'Montserrat', sans-serif",
  fontSize: '1.2rem',
  outline: 'none',
  display: 'flex',
  width: '100vw',
  boxSizing: 'content-box',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  margin: '1rem',
  overflow: 'hidden',
});
