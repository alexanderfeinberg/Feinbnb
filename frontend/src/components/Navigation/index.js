import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { MenuContext } from "../../context/MenuModal";
import CreateSpotFormModal from "../Spots/CreateSpotFormModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
      </>
    );
  } else {
    sessionLinks = (
      <>
        <button onClick={() => setShowModal("login")}>
          <i className="fas fa-user-circle" />
        </button>
        <LoginFormModal />
      </>
    );
  }

  return (
    <div className="nav-bar">
      <div className="home-link">
        <NavLink exact to="/">
          Home
        </NavLink>
      </div>
      <CreateSpotFormModal />
      <div className="action-btn">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
