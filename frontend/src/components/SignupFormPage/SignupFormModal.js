import React, { useState, useContext } from "react";
import { Modal } from "../../context/Modal";
import SignupFormPage from "./";
import { MenuContext } from "../../context/MenuModal";

function SignupFormModal() {
  const { showModal, setShowModal } = useContext(MenuContext);
  return (
    <>
      {showModal === "signup" && (
        <Modal onClose={() => setShowModal(false)}>
          <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignupFormModal;
