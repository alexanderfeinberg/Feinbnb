import React, { useState, useContext } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SignupFormPage from "../SignupFormPage";
import { MenuContext } from "../../context/MenuModal";

import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => {
    // console.log(state);
    return state.session.user;
  });
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { showModal, setShowModal } = useContext(MenuContext);

  //   if (sessionUser) {
  //     return <Redirect to="/" />;
  //   }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password }))
      .then(() => setShowModal(false))
      .catch(async (res) => {
        console.log("LOGIN DATA ", res);
        const data = await res.json();
        // console.log(data);
        if (data) setErrors([data.message]);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <SignupFormPage />
    </>
  );
}

export default LoginForm;
