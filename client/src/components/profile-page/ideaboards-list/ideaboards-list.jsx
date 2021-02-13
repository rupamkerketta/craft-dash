import React from "react";
import '../ideaboards-list/ideaboards-list.scss'

function IdeaBoardsList(props) {
  return (
    <div className="active-ideaboards-list-wrapper-light">
      <div className="color-circle-light"></div>
      <h6 className="ideaboard-title-light">{props.title}</h6>
    </div>
  );
}

export default IdeaBoardsList;
