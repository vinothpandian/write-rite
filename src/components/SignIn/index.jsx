import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';

import SignInForm from './SignInForm';

const SignIn = ({ show, onHide }) => (
  <Modal
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
  </Modal>
);

SignIn.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default SignIn;
