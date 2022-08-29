import { useRef } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as IconClose } from "../images/icons/close.svg";
import Button from "./Button";

const Dialog = styled.dialog`
  margin: auto;
  border-radius: 1rem;
  background: ${(props) => props.theme.bgColorSecondary};
  color: ${(props) => props.theme.textColor};
  box-shadow: var(--shadow-elevation-high);
  padding: 2rem;
  border: none;

  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }
`;

const H2 = styled.h2`
  font-size: var(--fs-600);
`;

const ModalTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ModalCloseButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.textColor};
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Modal = ({ children, title, isOpen, handleClose, onSubmit }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
      document.body.classList.add("modal-open");
    } else {
      modalRef.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  return (
    <Dialog ref={modalRef} onCancel={handleClose}>
      <ModalTitle>
        <H2 style={{ margin: 0 }}>{title}</H2>
        <ModalCloseButton onClick={handleClose}>
          <IconClose style={{ width: "2rem" }} />
        </ModalCloseButton>
      </ModalTitle>
      <Form onSubmit={onSubmit} action="">
        {children}
        <Button main width="100%">
          Submit
        </Button>
      </Form>
    </Dialog>
  );
};

export default Modal;
