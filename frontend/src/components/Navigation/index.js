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
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <ProfileButton user={sessionUser} />
        <button
          onClick={() => {
            setDefaultValue(false);
            setShowModal("createSpot");
          }}
        >
          Create Spot
        </button>
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
    <div className="nav-bar">
      <div className="home-link">
        <NavLink exact to="/">
          Home
        </NavLink>
      </div>
      <div className="action-btn">{isLoaded && sessionLinks}</div>
    </div>
  );
}

export default Navigation;
