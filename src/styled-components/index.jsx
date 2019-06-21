import Button from 'react-bootstrap/Button';
import styled from '@emotion/styled';
import Jumbotron from 'react-bootstrap/Jumbotron';

export const StyledButton = styled(Button)({
  outline: 'none',
  border: 'none',
  marginLeft: '1rem',
});

export const StyledJumbotron = styled(Jumbotron)({
  backgroundColor: 'transparent',
  // borderTop: '1px solid red',
});

export const StyledHR = styled.hr(({ theme }) => {
  const borderColor = theme.className === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)';
  return { margin: 0, borderTop: `1px solid ${borderColor}` };
});
