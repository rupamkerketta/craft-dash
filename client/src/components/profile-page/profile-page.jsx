import React from "react";
import BrandLogo from "../brand-logo/brand-logo";
import "../profile-page/profile-page.scss";
import UserPic from "../../img/user-img-placeholder.svg";
import { NavLink, Link, Switch, Route } from "react-router-dom";
import IdeaBoardsList from "../profile-page/ideaboards-list/ideaboards-list";
import {
  loadIBS,
  createIBS,
  deleteIBS,
} from "../../redux/idea-boards/ideaBoardsActions";

import {connect} from 'react-redux';
import { logout } from "../../redux/logout/logoutActions";


function ProfilePage({idea_boards, user, logout}) {
  
  return (
    <div>
      <div className="app-bar">
        <div>
          <ul>
            <li className="logo">
              <Link to="/dashboard">
                <BrandLogo
                  fontStyles={{ fontSize: "1.4em", marginLeft: "10px" }}
                  logoStyles={{ width: "30px" }}
                />
              </Link>
            </li>
            <li><button className="logout-button" onClick={()=>logout()}>Logout</button></li>
          </ul>
        </div>
      </div>
      <div className="profile-card">
        <p className="username">{user.username}</p>
        <p className="email">{user.email}</p>
        <p className="subscription">Subscription Here</p>
        <img className="userImage" src={user.thumbnail === "" ? UserPic : user.thumbnail} alt="" />
        <button className="edit-profile-button">Edit Profile</button>
      </div>
      <div className="subscription-card">
        <p className="subscription-header">Active Subscription</p>
        <p className="subscription-plan">₹000/month</p>
        <p className="subscription-date">Active Till: 00/00/0000</p>
        <button className="renew-subscription-button">
          Renew Subscription
        </button>
      </div>
      <div className="active-time-card">
        <p className="active-time-header">Active Time</p>
        <p className="active-time-month">Month of September</p>
      </div>
      <div className="active-ideaboards-card">
        <p className="active-ideaboards-header">Active IdeaBoards</p>
        <div className="active-ideaboards-list">
          {idea_boards.map(idea_board => <IdeaBoardsList title={idea_board.idea_board_name}/>)
          }
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return(
    {
      idea_boards: state.idea_boards.boards.data,
      user: state.user
    }
  )
}

export default connect(mapStateToProps, {logout})(ProfilePage);
