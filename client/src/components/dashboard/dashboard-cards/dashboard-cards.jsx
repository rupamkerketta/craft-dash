import React from "react";
import { Link } from "react-router-dom";
import "./dashboard-cards.scss";

// Craft Dash Logo
import CraftDashLogo from "../../../img/craft-dash-logo.svg";
import CloudLogo from '../../../img/CloudLogo.png'
import Owner from "../../../img/user-img-placeholder.svg";
import Avatar1 from "../../../img/Avatar1.png";
import Avatar2 from "../../../img/Avatar2.png";
import Avatar3 from "../../../img/Avatar3.png";
import Avatar4 from "../../../img/Avatar4.png";
import Avatar5 from "../../../img/Avatar5.png";

import Delete from "../../../img/trash.svg";
import Edit from "../../../img/edit.svg";
import Rocket from "../../../img/rocket-2.svg";

import Avatars from "../../avatars/avatars-import";
import { disconnect } from "mongoose";

function DashboardCards(props) {
  return (
    <div className="dashboard-cards">
      <div className="cards">
        <div className="card">
          <h1 className="main">
            <div className="logo-wrapper">
              <img src={CraftDashLogo} alt="" />
            </div>
          </h1>
          <div className="footer">
            <div className="idea-board-title">
              <h1>{props.title}</h1>
              <div className="actions">
                <img
                  className="delete"
                  src={Delete}
                  alt="Delete"
                  title="Delete"
                  onClick={() =>
                    props.deleteHandler(props._id, props.title, true)
                  }
                />
                <img
                  className="edit"
                  src={Edit}
                  alt="Delete"
                  title="Edit"
                  onClick={() =>
                    props.editHandler(props._id, props.title, true)
                  }
                />
                <Link to="/craft-dash-cloud">
                <div className="cloud-storage-icon-wrapper">
                  <img src={CloudLogo} className="cloud-storage-icon" />
                </div>
                </Link>
                <Link to={`/main/${props._id}`} className="rocket-wrapper">
                  <img
                    className="rocket"
                    src={Rocket}
                    alt="Open"
                    title="Open"
                  />
                </Link>
              </div>
            </div>
            <div className="idea-board-members">
              <div className="idea-board-others">
                {/* TODO Conditional Rendering of Users in the IdeaBoard  */}
                {/* <Avatars index="1"/> */}
                {/* <Avatars index="2"/> */}
                {/* <Avatars index="11"/> */}
              </div>
              <div className="idea-board-owner">
                <Avatars index={0} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardCards;
