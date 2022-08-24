import { useRef } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

import { ReactComponent as IconClose } from "../images/icons/close.svg";

const Dialog = styled.dialog`
  justify-content: center;
  gap: 1rem;
  width: 50vw;
  border-radius: 1rem;
  background: ${(props) => props.theme.bgColorSecondary};
  color: ${(props) => props.theme.textColor};
  box-shadow: var(--shadow-elevation-high);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  padding: 2rem;
  border: none;

  &::backdrop {
    background: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 50em) {
    width: 95%;
  }
`;

const ModalTitle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
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

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Modal = ({ children, isOpen, handleClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (isOpen) {
      console.log("showing modal");
      ref.current?.showModal();
      document.body.classList.add("modal-open");
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  return (
    <Dialog ref={ref} onCancel={handleClose} onClick={handleClose}>
      <ModalTitle>
        <h2 style={{ margin: 0 }}>Edit set</h2>
        <ModalCloseButton onClick={handleClose}>
          <IconClose style={{ width: "2rem" }} />
        </ModalCloseButton>
      </ModalTitle>
      <InputContainer>{children}</InputContainer>
      <ButtonContainer>
        <ModalButton onClick={handleClose}>Cancel</ModalButton>
        <ModalButton main>Submit</ModalButton>
      </ButtonContainer>
    </Dialog>
  );
};

export default Modal;
