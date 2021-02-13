import React from "react";
import '../ideaboards-list/ideaboards-list.scss'

function IdeaBoardsList(props) {
  return (
    <div className="active-ideaboards-list-wrapper">
      <div className="color-circle"></div>
      <h6 className="ideaboard-title">{props.title}</h6>
    </div>
  );
}

export default IdeaBoardsList;
