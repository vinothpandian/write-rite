import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';

import SignInForm from './SignInForm';
import { BorderedModal } from '../../styled-components';
import customProps from '../../proptypes';

const SignIn = ({ theme, show, onHide }) => (
  <BorderedModal
    theme={theme}
    show={show}
    onHide={onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Sign in</Modal.Title>
    </Modal.Header>

    <SignInForm onHide={onHide} />
  </BorderedModal>
);

SignIn.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  theme: customProps.theme.isRequired,
};

export default SignIn;
