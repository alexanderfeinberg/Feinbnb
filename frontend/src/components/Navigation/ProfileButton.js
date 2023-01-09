import React, { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { MenuContext } from "../../context/MenuModal";
import HostHome from "./HostHome";

import "./ProfileButton.css";
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

  let dropdown;
  if (user) {
    dropdown = (
      <>
        <div className="dropdown-item user-info">
          <div className="dropdown-item-content">{user.username}</div>
          <div className="dropdown-item-content">{user.email}</div>
        </div>
        <div className="dropdown-item profile-action-btns">
          <div className="hover-background dropdown-item-content">
            <Link to="/profile" className="btn btn-primary">
              Profile
            </Link>
          </div>
          {/* <div className="hover-background dropdown-item-content">
            <Link to="/reviews/current/" className="btn btn-primary">
              My reviews
            </Link>
          </div> */}
        </div>
        <div className="dropdown-item profile-secondary-btns">
          <div className="hover-background  dropdown-item-content">
            <HostHome user={user} message={"Host your home"} />
          </div>
          <div className="hover-background dropdown-item-content">
            <Link onClick={logout}>Log Out</Link>
          </div>
        </div>
      </>
    );
  } else {
    dropdown = (
      <>
        <div className="profile-action-btns">
          <div>
            <a
              onClick={() => {
                console.log("CLICK");
                setShowModal("login");
              }}
            >
              Login
            </a>
          </div>
          <div>
            <a onClick={() => setShowModal("signup")}>Sign Up</a>
          </div>
          <div>
            <a
              onClick={async () => {
                dispatch(
                  sessionActions.login({
                    credential: "Demo-lition",
                    password: "password",
                  })
                ).then(() => setShowModal(false));
              }}
            >
              Demo User
            </a>
          </div>
        </div>
        <div className="login-secondary-btns">
          <HostHome user={user} message={"Host your home"} />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="profile-button-btn">
        <button onClick={openMenu}>
          <div className="profile-button-icons">
            <div className="hamburger">
              <i class="fa fa-bars fa-lg" aria-hidden="true"></i>
            </div>
            <div className="profile-pic">
              <i className="fas fa-user-circle fa-lg" />
            </div>
          </div>
        </button>
      </div>

      {showMenu && <div className="profile-dropdown">{dropdown}</div>}
    </>
  );
}

export default ProfileButton;
