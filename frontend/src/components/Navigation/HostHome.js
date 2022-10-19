import { useContext } from "react";
import { MenuContext } from "../../context/MenuModal";

const HostHome = ({ user, message }) => {
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);
  return (
    <div className="host-home-btn">
      <a
        onClick={() => {
          if (user) {
            setDefaultValue(false);
            setShowModal("createSpot");
            return;
          }
          setShowModal("login");
        }}
      >
        {message}
      </a>
    </div>
  );
};

export default HostHome;
