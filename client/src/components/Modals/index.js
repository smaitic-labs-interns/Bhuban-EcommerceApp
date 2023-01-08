import React, { useState } from 'react';
import { Modal, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';

import {
  ModalWrapper,
  OpenModalButton,
  CloseButton,
  ModalTitleWrapper,
  ModalTitleDescWrapper,
  ModalContainer,
  ModalHeaderWrapper,
  ModalBodyWrapper,
  ModalBodyContainer,
  ModalFooterWrapper,
  ModalFooterContainer,
} from './styles/modalStyle';

export default function CustomModal({
  name,
  openIcon,
  openBtnColor,
  openBtnVariant,
  initially = false,
  title,
  titleDesc,
  body,
  footer,
}) {
  const [open, setOpen] = useState(() => (initially ? true : false));
  return (
    <ModalWrapper>
      <OpenModalButton variant={openBtnVariant} color={openBtnColor} onClick={() => setOpen(true)}>
        {openIcon}
        <Typography>{name}</Typography>
      </OpenModalButton>
      <Modal
        open={open}
        aria-labelledby={title || 'custom-modal-modal-title'}
        aria-describedby='modal-modal-description'
        onClose={() => setOpen(false)}
      >
        <ModalContainer>
          <ModalHeaderWrapper>
            <ModalTitleWrapper>
              <Typography fontWeight={600} fontSize={'24px'} color={'#1976D2'}>
                {title}
              </Typography>
            </ModalTitleWrapper>
            {titleDesc && <ModalTitleDescWrapper>{titleDesc}</ModalTitleDescWrapper>}
            <CloseButton onClick={() => setOpen(false)}>
              <Close />
            </CloseButton>
          </ModalHeaderWrapper>
          {body && (
            <ModalBodyWrapper>
              <ModalBodyContainer>{body}</ModalBodyContainer>
            </ModalBodyWrapper>
          )}

          {footer && (
            <ModalFooterWrapper>
              <ModalFooterContainer>{footer}</ModalFooterContainer>
            </ModalFooterWrapper>
          )}
        </ModalContainer>
      </Modal>
    </ModalWrapper>
  );
}
