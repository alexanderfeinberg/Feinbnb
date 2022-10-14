import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

const LoginFormPage = () => {
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [valErrors, setValErrors] = useState([]);
  const [credErr, setCredErr] = useState([]);
  let dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let user = await dispatch(login({ credential, password }));
    if (!user.ok) {
      setCredErr([user.message]);
      return;
    }
    console.log("USER ", user);
    history.push("/");
  };

  useEffect(() => {
    const errors = [];
    if (!credential.length) errors.push("Email/Username is required.");
    if (!password.length) errors.push("Password is required.");
    if (password.length < 8)
      errors.push("Password length must be 8 or more characters.");
    setValErrors(errors);
  }, [credential, password]);
  return (
    <form onSubmit={handleSubmit}>
      <h2>Log In</h2>
      <ul className="errors">
        {credErr.length > 0 && credErr.map((err) => <li key={err}>{err}</li>)}
        {valErrors.length > 0 &&
          valErrors.map((err) => <li key={err}>{err}</li>)}
      </ul>
      <label>
        Email/Username
        <input
          type="text"
          name="credential"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
        />
      </label>

      <label>
        Password
        <input
          type="text"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button type="submit" disabled={valErrors.length > 0 ? true : false}>
        Log In
      </button>
    </form>
  );
};

export default LoginFormPage;
