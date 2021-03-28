import React from "react";

import { useSelector } from "react-redux";
import "../ideaboards-list/ideaboards-list.scss";
import "../ideaboards-list/ideaboards-list-light.scss";

function IdeaBoardsList(props) {
  const theme = useSelector((state) => state.theme);
  const dark = theme === "dark";

  return (
    <div
      className={`active-ideaboards-list-wrapper ${
        dark ? "" : "active-ideaboards-list-wrapper-light"
      }`}
    >
      <div className="color-circle"></div>
      <h6 className={`ideaboard-title ${dark ? "" : "ideaboard-title-light"}`}>{props.title}</h6>
    </div>
  );
}

export default IdeaBoardsList;
