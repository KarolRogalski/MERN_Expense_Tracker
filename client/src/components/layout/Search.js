import React, { useState } from "react";

export const Search = (props) => {
  const [searchText, setSearchText] = useState("");

  let tempStyle = { fontSize: "1.1rem" };
  if (searchText) {
    tempStyle = { width: "70%", backgroundPosition: "95% center" };
  }

  return (
    <input
      style={tempStyle}
      className="search-text"
      type="text"
      placeholder=""
      onChange={(e) => {
        props.onChange(e.target.value);
        setSearchText(e.target.value);
      }}
    ></input>
  );
};
