import React, { useState, useContext } from "react";
import { Modal } from "../../context/Modal";
import LoginForm from "./LoginForm";
import { MenuContext } from "../../context/MenuModal";

function LoginFormModal() {
  const { showModal, setShowModal } = useContext(MenuContext);
  return (
    <>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
