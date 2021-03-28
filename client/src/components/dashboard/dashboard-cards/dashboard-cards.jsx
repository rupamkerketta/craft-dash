import React from "react";
import { Link } from "react-router-dom";
import "./dashboard-cards.scss";
import "./dashboard-cards-light.scss";


import { useSelector } from "react-redux";

// Craft Dash Logo
import CraftDashLogo from "../../../img/craft-dash-logo.svg";
import CloudLogo from "../../../img/CloudLogo.png";
// import Owner from '../../../img/user-img-placeholder.svg'
// import Avatar1 from '../../../img/Avatar1.png'
// import Avatar2 from '../../../img/Avatar2.png'
// import Avatar3 from '../../../img/Avatar3.png'
// import Avatar4 from '../../../img/Avatar4.png'
// import Avatar5 from '../../../img/Avatar5.png'

import Delete from "../../../img/trash.svg";
import Edit from "../../../img/edit.svg";
import Rocket from "../../../img/rocket-2.svg";

import Avatars from "../../avatars/avatars-import";

function DashboardCards(props) {
  const theme = useSelector((state) => state.theme);
  const dark = theme === "dark";
  return (
    <div className={` dashboard-cards ${dark ? "" : "dashboard-cards-light"}`}>
      <div className={`cards ${dark ? "" : "cards-light"}`}>
        <div className={`card ${dark ? "" : "card-light"}`}>
          <h1 className={`main-bg ${dark ? "" : "main-bg-light"}`}>
            <div className={`logo-wrapper ${dark ? "" : "logo-wrapper-light"}`}>
              <img src={CraftDashLogo} alt="" />
            </div>
          </h1>
          <div className={`footer ${dark ? "" : "footer-light"}`}>
            <div
              className={`idea-board-title ${
                dark ? "" : "idea-board-title-light"
              }`}
            >
              <h1>{props.title}</h1>
              <div className={`actions ${dark ? "" : "actions-light"}`}>
                <img
                  className={`delete ${dark ? "" : "delete-light"}`}
                  src={Delete}
                  alt="Delete"
                  title="Delete"
                  onClick={() =>
                    props.deleteHandler(props._id, props.title, true)
                  }
                />
                <img
                  className={`edit ${dark ? "" : "edit-light"}`}
                  src={Edit}
                  alt="Edit"
                  title="Edit"
                  onClick={() =>
                    props.editHandler(props._id, props.title, true)
                  }
                />
                <Link to={`/craft-dash-cloud/${props._id}`}>
                  <div
                    className={`cloud-storage-icon-wrapper ${
                      dark ? "" : "cloud-storage-icon-wrapper-light"
                    }`}
                  >
                    <img
                      src={CloudLogo}
                      className={`cloud-storage-icon ${
                        dark ? "" : "cloud-storage-icon-light"
                      }`}
                    />
                  </div>
                </Link>
                <Link
                  to={`/main/${props._id}`}
                  className={`rocket-wrapper ${
                    dark ? "" : "rocket-wrapper-light"
                  }`}
                >
                  <img
                    className={`rocket ${dark ? "" : "rocket-light"}`}
                    src={Rocket}
                    alt="Open"
                    title="Open"
                  />
                </Link>
              </div>
            </div>
            <div
              className={`idea-board-members ${
                dark ? "" : "idea-board-members-light"
              }`}
            >
              <div
                className={`idea-board-others ${
                  dark ? "" : "idea-board-others-light"
                }`}
              >
                {/* TODO Conditional Rendering of Users in the IdeaBoard  */}
                {/* <Avatars index="1"/> */}
                {/* <Avatars index="2"/> */}
                {/* <Avatars index="11"/> */}
              </div>
              <div
                className={`idea-board-owner ${
                  dark ? "" : "idea-board-owner-light"
                }`}
              >
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
