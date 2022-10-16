import { useContext } from "react";
import { Modal } from "../../context/Modal";
import { MenuContext } from "../../context/MenuModal";
import CreateSpotForm from "./CreateSpotFrom";

function CreateSpotFormModal() {
  const { showModal, setShowModal } = useContext(MenuContext);
  return (
    <>
      {showModal === "createSpot" && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateSpotForm />
        </Modal>
      )}
    </>
  );
}

export default CreateSpotFormModal;
