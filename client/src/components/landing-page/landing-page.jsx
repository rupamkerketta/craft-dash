import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { NavLink, Link, Switch, Route } from "react-router-dom";
import CDLogo from "../../img/LogoWithLight.svg";
import Illustration1 from "../../img//Guy.svg";
import Globe from "../../img//Globe.svg";
import Illustration2 from "../../img//IdeaBoardIllustration.svg";
import Illustration3 from "../../img//RealTimeInteractionIllustration.svg";
import Illustration4 from "../../img//FileSharingIllustration.svg";
import Illustration5 from "../../img//ThumbsUpGirl.svg";
import Gmail from "../../img//Gmail.svg";
import Twitter from "../../img//Twitter.svg";
import Instagram from "../../img//Instagram.svg";
import NodeJs from "../../img//NodJs.svg";
import Express from "../../img//Express.svg";
import Figma from "../../img//Figma.svg";
import Firebase from "../../img//Firebase.svg";
import MongoDB from "../../img//MongoDB.svg";
import ReactLogo from "../../img//React.svg";
import Redux from "../../img//Redux.svg";
import Sass from "../../img//Sass.svg";
import GitHub from "../../img//GithubIcon.svg";
import Socket from "../../img//Socket.svg";
import WebRTC from "../../img//WebRTC.svg";
// Loading Page
import LoadingPage from "../loading-page/loading-page";

// Style
import "./landing-page.scss";
import "./about.scss";
import "./home.scss";

function LandingPage({match, auth }) {
	React.useEffect(() => {
		console.log("[useEffect]");
		console.log(match);
	  }, []);
  return (
    <div className="landing-page">
      {!auth.isAuthenticated && auth.loading ? (
        <LoadingPage />
      ) : !auth.isAuthenticated ? (
		<LandingPageContent match={match} />
		// <h1>LandingPage</h1>
      ) : (
        <Redirect to="/dashboard" />
      )}
    </div>
  );
}
const LandingPageContent = (props) => {

	const [isHome, setIsHome] = React.useState(true)
  return (
    <div>
      <div className="navbar">
        <ul>
         
          <li>
            {/* <NavLink
              to="/landing-page?section=home"
              className="home-bar"
              activeClassName="active-link"
              style={{
                borderBottom:
                  props.match.path === "/landing-page"
                    ? "5px solid #3FDE9C"
                    : "",
              }}
            > */}
			 <h4 
			 onClick={() => setIsHome(true)} 
			 style={{borderBottom: `3px solid ${isHome ? '#3FDE9C' : 'transparent'}`, cursor:'pointer'}}> Home </h4>
            {/* </NavLink> */}
          </li>
          <li>
            {/* <NavLink
              to="/landing-page?section=about"
              className="about-bar"
              activeClassName="active-link"
            > */}
			<h4 
			onClick={() => setIsHome(false)} 
			style={{borderBottom: `3px solid ${isHome ? 'transparent' : '#3FDE9C'}`, cursor:'pointer'}}> About </h4>
            {/* </NavLink> */}
          </li>
          <li>
            <Link to="/signup">
              <button className="join-btn">Sign Up</button>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
          </li>
        </ul>
      </div>
      <div className="landing-wrapper">
		{/* {console.log(props.match)} */}
        {/* {props.match.path === "/landing-page" ? <Home /> : ""}
        {props.match.params.id === "home" ? <Home /> : ""}
        {props.match.params.id === "about" ? <About /> : ""} */}
		{
			isHome ? <Home /> : <About/>
		}
      </div>
    </div>
  );
};

const Home = () => {
	
  return (
    <div className="home-page-wrapper">
      <div className="row-6">
        <table>
          <tr>
            <img src={CDLogo} classname="cd-logo" />
            <img src={Globe} className="globe" />
            <img src={Illustration1} className="illustration-1" />
          </tr>
        </table>
      </div>
      <div className="row-7">
        <table>
          <tr>
            <div className="wrapper-ideaboards">
              <img src={Illustration2} className="illustration-2" />
              <h1>Idea Boards</h1>
              <p>
                Connect with your team using our Idea Boards for real time
                interaction to collab on another level !!
              </p>
            </div>
          </tr>
        </table>
      </div>
      <div className="row-8">
        <table>
          <tr>
            <div className="wrapper-realtime">
              <img src={Illustration3} className="illustration-3" />
              <h1>Real Time Interaction</h1>
              <p>
                Interact with Video and Text messages with zero lag and forget
                the worry of people spying for your data!
              </p>
            </div>
          </tr>
        </table>
      </div>
      <div className="row-9">
        <table>
          <tr>
            <div className="wrapper-file-sharing">
              <img src={Illustration4} className="illustration-4" />
              <h1>Share and Edit in Real Time</h1>
              <p>
                Share your work files with your fellow team members and keep it
                synchronized to have less pressure on relying to a third party
                service.
              </p>
            </div>
          </tr>
        </table>
      </div>
      <div className="row-10">
        <div className="Illustration-5">
          <img src={Illustration5} />
          <h1>Join Us and Enjoy Much More!</h1>
          <p>So much more we can’t fit in this page</p>
        </div>
      </div>
      <div className="row-11">
        <table>
          <tr>
            <div className="contact-logos">
              <img src={Gmail}></img>
              <img src={Twitter}></img>
              <img src={Instagram}></img>
            </div>
          </tr>
          <tr>
            <p>Created by Rupam Kerketta & Vishnu Jayakumar</p>
          </tr>
          <tr>
            <p>© 2021</p>
          </tr>
        </table>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <div className="logo">
        <img src={CDLogo} alt="LogoWithLight" />
        <p>
          A web application which allows you to Create IdeaBoard Host Meetings
          Note Creation, Mind-mapping Real-time group chats (Video and Text)
          Polling on Ideas Task Planning or Roadmap for a particular topic for
          any subject Role-Based Activities and Privileges Voice Notes File
          Sharing (Images, Videos, Text Files, etc.)
        </p>
      </div>
      <div className="row-12">
        <table>
          <tr>
            <div className="tech-logos">
              <img src={NodeJs}></img>
              <img src={ReactLogo}></img>
              <img src={GitHub}></img>
              <img src={Firebase}></img>
              <img src={Figma}></img>
              <img src={Express}></img>
              <img src={Redux}></img>
              <img src={WebRTC}></img>
              <img src={MongoDB}></img>
              <img src={Socket}></img>
              <img src={Sass}></img>
            </div>
          </tr>
          <tr>
            <p>Created by Rupam Kerketta & Vishnu Jayakumar</p>
          </tr>
          <tr>
            <p>© 2021</p>
          </tr>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(LandingPage);
