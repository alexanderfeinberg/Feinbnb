import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { MenuContext } from "../../context/MenuModal";
import CreateSpotFormModal from "../Spots/CreateSpotFormModal";
import HostHome from "./HostHome";
import SignupFormModal from "../SignupFormPage/SignupFormModal";
import logo from "../../static/logo.png";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const { showModal, setShowModal, defaultValue, setDefaultValue } =
    useContext(MenuContext);

  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  // if (sessionUser) {
  sessionLinks = (
    <>
      <ProfileButton user={sessionUser} />
    </>
  );

  return (
    <div className="nav-bar">
      <div className="home-link">
        <NavLink exact to="/">
          <img src={logo} />
        </NavLink>
      </div>
      <CreateSpotFormModal />
      <LoginFormModal />
      <SignupFormModal />
      <div className="nav-right-btns">
        <div className="host-home-nav">
          <HostHome user={sessionUser} message={"Become a Host"} />
        </div>
        <div className="action-btn">{isLoaded && sessionLinks}</div>
      </div>
    </div>
  );
}

export default Navigation;
