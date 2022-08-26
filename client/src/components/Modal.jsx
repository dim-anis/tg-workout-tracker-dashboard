import { useRef } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as IconClose } from "../images/icons/close.svg";

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

const ModalButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.textContrast};
  border: 1px solid
    ${(props) =>
      props.main ? props.theme.colorMain : props.theme.textColorSecondary};
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: ${(props) => (props.main ? props.theme.colorMain : "none")};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Modal = ({ children, title, isOpen, handleClose }) => {
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
      <div>
        <Form>{children}</Form>
        <ButtonContainer>
          <ModalButton onClick={handleClose}>Cancel</ModalButton>
          <ModalButton main>Submit</ModalButton>
        </ButtonContainer>
      </div>
    </Dialog>
  );
};

export default Modal;
