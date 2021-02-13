import React from "react";
import { Link } from "react-router-dom";
import "./dashboard-cards.scss";

// Craft Dash Logo
import CraftDashLogo from "../../../img/craft-dash-logo.svg";
import Owner from "../../../img/user-img-placeholder.svg";
import Avatar1 from "../../../img/Avatar1.png";
import Avatar2 from "../../../img/Avatar2.png";
import Avatar3 from "../../../img/Avatar3.png";
import Avatar4 from "../../../img/Avatar4.png";
import Avatar5 from "../../../img/Avatar5.png";

import Delete from "../../../img/trash.svg";
import Edit from "../../../img/edit.svg";
import Rocket from "../../../img/rocket-2.svg";
import { disconnect } from "mongoose";

function DashboardCards(props) {
  return (
    <div className="dashboard-cards-light">
      <div className="cards-light">
        <div className="card-light">
          <h1 className="main-light">
            <div className="logo-wrapper-light">
              <img src={CraftDashLogo} alt="" />
            </div>
          </h1>
          <div className="footer-light">
            <div className="idea-board-title-light">
              <h1>{props.title}</h1>
              <div className="actions-light">
                <img
                  className="delete-light"
                  src={Delete}
                  alt="Delete"
                  title="Delete"
                  onClick={() =>
                    props.deleteHandler(props._id, props.title, true)
                  }
                />
                <img
                  className="edit-light"
                  src={Edit}
                  alt="Delete"
                  title="Edit"
                  onClick={() =>
                    props.editHandler(props._id, props.title, true)
                  }
                />

                <Link to={`/main/${props._id}`} className="rocket-wrapper-light">
                  <img
                    className="rocket-light"
                    src={Rocket}
                    alt="Open"
                    title="Open"
                  />
                </Link>
              </div>
            </div>
            <div className="idea-board-members-light">
              <div className="idea-board-others-light">
                {/* TODO Conditional Rendering of Users in the IdeaBoard  */}
                {/* <img src={Owner} alt="" /> */}
                {/* <img src={Owner} alt="" /> */}
                {/* <img src={Owner} alt="" /> */}
              </div>
              <div className="idea-board-owner-light">
                <img src={Owner} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
