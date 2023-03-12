import React from 'react';

import Modal from './Modal';
import Button from '../FormElements/Button';
import "./NotFound.css"

const NotFound = props => {
  return (
    <Modal
      className="error-modal"
      onCancel={props.onClear}
      header="Not Found"
      show={!!props.show}
      footer={<Button  onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.children}</p>
    </Modal>
  );
};

export default NotFound;
