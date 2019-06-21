import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';

import SignUpForm from './SignUpForm';

const SignUp = ({ show, onHide }) => (
  <Modal
    show={show}
    onHide={onHide}
    size="md"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
    </Modal.Header>

    <SignUpForm onHide={onHide} />
  </Modal>
);

SignUp.propTypes = {
  onHide: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default SignUp;
