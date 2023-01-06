import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { RemoveRedEye, Close } from '@mui/icons-material';

import {
  ModalWrapper,
  OpenModalButton,
  CloseButton,
  ModalTitleWrapper,
  ModalContainer,
  ModalHeaderWrapper,
} from './styles/modalStyle';
import PropTypes from 'prop-types';

export default function CustomModal({ name, initially, title }) {
  const [open, setOpen] = useState(() => (initially ? true : false));
  return (
    <ModalWrapper>
      <OpenModalButton
        variant='outlined'
        color='info'
        onClick={() => setOpen(true)}
        autoCapitalize={false}
      >
        <RemoveRedEye />
        <Typography>{name || 'custom modal'}</Typography>
      </OpenModalButton>
      <Modal
        open={open}
        aria-labelledby={title || 'custom-modal-modal-title'}
        aria-describedby='modal-modal-description'
        onClose={() => setOpen(false)}
      >
        <ModalContainer>
          <ModalHeaderWrapper>
            <ModalTitleWrapper>Shipping Address</ModalTitleWrapper>
            <CloseButton onClick={() => setOpen(false)}>
              <Close />
            </CloseButton>
          </ModalHeaderWrapper>
        </ModalContainer>
      </Modal>
    </ModalWrapper>
  );
}

CustomModal.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  initially: PropTypes.bool.isRequired,
};
