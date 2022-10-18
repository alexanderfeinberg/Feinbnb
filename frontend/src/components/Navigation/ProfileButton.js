import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { MenuContext } from "../../context/MenuModal";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <div className="profile-dropdown">
          <div className="user-info">
            <div>{user.username}</div>
            <div>{user.email}</div>
          </div>
          <div className="profile-action-btns">
            <div>
              <Link to="/spots/current/" className="btn btn-primary">
                My spots
              </Link>
            </div>
            <div>
              <Link to="/reviews/current/" className="btn btn-primary">
                My reviews
              </Link>
            </div>
          </div>
          <div classNAme="profile-secondary-btns">
            <div>
              <Link
                onClick={() => {
                  setDefaultValue(false);
                  setShowModal("createSpot");
                }}
              >
                Create Spot
              </Link>
            </div>
            <div>
              <Link onClick={logout}>Log Out</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
