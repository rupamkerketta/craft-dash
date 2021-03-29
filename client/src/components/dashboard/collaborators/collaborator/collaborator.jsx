import React from "react";
import { connect } from "react-redux";
import "./collaborator.scss";
import "./collaborator-light.scss";

import { actionCollaborator } from "../../../../redux/collaborator/collaboratorActions";

import { useSelector } from "react-redux";

import RemoveUser from "../../../../img/remove-user.svg";
import UserImg from "../../../../img/user-img-placeholder.svg";

function Collaborator({
  collaborator_email,
  collaborator_name,
  idea_board_id,
  actionCollaborator,
}) {
  const removeHandler = () => {
    console.log(collaborator_email, collaborator_name, idea_board_id);

    actionCollaborator({
      action: "remove-collaborator",
      collaborator_email,
      idea_board_id: idea_board_id.toString(),
    });
  };
  const theme = useSelector((state) => state.theme);
  const dark = theme === "dark";
  return (
    <div className={`collaborator ${dark ? "" : "collaborator-light"}`}>
      <div
        className={`collaborator-pic ${dark ? "" : "collaborator-pic-light"}`}
      >
        <img src={UserImg} alt="" title="" />
      </div>
      <div className={`collaborator-details ${dark?"":"collaborator-details-light"}`}>
        <div className={`collaborator-name ${dark?"":"collaborator-name-light"}`}>
          <h2>{collaborator_name}</h2>
        </div>
        <div className={`collaborator-email ${dark?"":"collaborator-email-light"}`}>
          <h2>{collaborator_email}</h2>
        </div>
      </div>
      <div className={`collaborator-remove-user ${dark?"":"collaborator-remove-user-light"}`}>
        <img
          src={RemoveUser}
          alt="Remove User"
          title="Remove User"
          onClick={() => removeHandler()}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, { actionCollaborator })(Collaborator);
