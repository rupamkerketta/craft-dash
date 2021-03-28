import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./owner.scss";
import "./owner-light.scss";

import UserImg from "../../../../img/user-img-placeholder.svg";
import OwnerCrown from "../../../../img/Crown.png";
import { useSelector } from "react-redux";

function Owner({ owner_email, owner_username }) {
  const theme = useSelector((state) => state.theme);
  const dark = theme === "dark";
  return (
    <div className={`owner ${dark ? "" : "owner-light"}`}>
      <div className={`owner-pic ${dark ? "" : "owner-pic-light"}`}>
        <img src={UserImg} alt="" title="" />
      </div>
      <div className={`owner-details ${dark ? "" : "owner-details-light"}`}>
        <div className={`owner-name ${dark ? "" : "owner-name-light"}`}>
          <h2>{owner_username}</h2>
        </div>
        <div className={`owner-email ${dark ? "" : "owner-email-light"}`}>
          <h2>{owner_email}</h2>
        </div>
      </div>
      <div className={`owner-crown ${dark ? "" : "owner-crown-light"}`}>
        <img src={OwnerCrown} alt="Owner Crown" title="Owner Crown" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.idea_boards.boards.data,
  };
};

export default connect(mapStateToProps, {})(Owner);
