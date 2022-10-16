import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import CreateSpotFormModal from "../Spots/CreateSpotFormModal";
import { MenuContext } from "../../context/MenuModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const { showModal, setShowModal } = useContext(MenuContext);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <button onClick={() => setShowModal("createSpot")}>Create Spot</button>
        <CreateSpotFormModal />
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
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
