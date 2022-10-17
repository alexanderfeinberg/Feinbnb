import { useContext } from "react";
import { Modal } from "../../context/Modal";
import { MenuContext } from "../../context/MenuModal";
import CreateSpotForm from "./CreateReviewForm.js";

function CreateReviewFormModal({ spot }) {
  const { showModal, setShowModal } = useContext(MenuContext);
  return (
    <>
      {showModal === "createReview" && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm spot={spot} />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewFormModal;
