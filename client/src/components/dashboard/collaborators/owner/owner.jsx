import React from "react";
import { connect } from "react-redux";
import "./owner.scss";

import UserImg from "../../../../img/user-img-placeholder.svg";
import OwnerCrown from "../../../../img/Crown.png";

function Owner({ owner_email , owner_name}) {
  return (
    <div className="owner">
      <div className="owner-pic">
        <img src={UserImg} alt="" title="" />
      </div>
      <div className="owner-details">
      <div className="owner-name">
          <h2>{owner_name}</h2>
        </div>
        <div className="owner-email">
          <h2>{owner_email}</h2>
        </div>
      </div>
      <div className="owner-crown">
        <img src={OwnerCrown} alt="Owner Crown" title="Owner Crown" />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Owner);
