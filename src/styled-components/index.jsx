import Button from 'react-bootstrap/Button';
import styled from '@emotion/styled';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';

export const ThemedButton = styled(Button)({
  outline: 'none',
  border: 'none',
  marginLeft: '1rem',
});

export const ThemedJumbotron = styled(Jumbotron)({
  backgroundColor: 'transparent',
  // borderTop: '1px solid red',
});

export const ThemedHR = styled.hr(({ theme }) => {
  const borderColor = theme.className === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)';
  return { margin: 0, borderTop: `1px solid ${borderColor}` };
});

export const PaddedContainer = styled(Container)({
  padding: '2rem',
});

export const BorderedModal = styled(Modal)(({ theme }) => {
  const borderColor = theme.className === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)';
  return {
    '& .modal-dialog': {
      '& .modal-content': {
        border: `1px solid ${borderColor}`,
        background: 'transparent',
      },
    },
  };
});
