import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import ErrorNotice from "../misc/ErrorNotice";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setError] = useState();

  const { user_id, logIn, error, removeError } = useContext(GlobalContext);

  const history = useHistory();

  const submit = (e) => {
    e.preventDefault();

    const loginUser = { email, password };
    logIn(loginUser);
  };

  useEffect(() => {
    if (error) setError(error);
    if (localStorage.getItem("auth-token")) history.push("/");
  }, [user_id, error]);

  return (
    <div className="page">
      <h2>Log in</h2>
      {errorMsg && (
        <ErrorNotice
          message={error}
          clearError={() => {
            removeError();
            setError(undefined);
          }}
        />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email"> Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password"> Password</label>
        <input
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input type="submit" value="Login" />
      </form>
    </div>
  );
}
