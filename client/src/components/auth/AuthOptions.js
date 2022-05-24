import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";

export default function AuthOptions() {
  const { user_id, logOut } = useContext(GlobalContext);
  const history = useHistory();

  const logout = () => {
    localStorage.setItem("auth-token", "");
    logOut();
    history.push("/");
  };
  return (
    <nav className="auth-options">
      {user_id ? <button onClick={logout}>Logout</button> : <></>}
    </nav>
  );
}
