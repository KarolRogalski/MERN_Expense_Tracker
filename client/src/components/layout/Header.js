import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState";
import AuthOptions from "../auth/AuthOptions";

export default function Header() {
  const { displayName, currentAlbum } = useContext(GlobalContext);

  let name = displayName;
  if (!name) name = "Your ET";

  return (
    <header id="header">
      <h1 className="title">
        {currentAlbum && name && currentAlbum !== "...newAlbum..."
          ? `${name} : ${currentAlbum}`
          : `${name}`}
      </h1>
      <AuthOptions />
    </header>
  );
}
