import React from "react";
import { connect } from "react-redux";
import "./top-nav-main.scss";
import "./top-nav-main-light.scss";


// Brand Logo
import BrandLogo from "../../brand-logo/brand-logo";
import BrandLogoLight from "../../brand-logo-light/brand-logo-light";


// Video Actions
import {
  enableFullMode,
  disableFullMode,
} from "../../../redux/video/videoActions";

import { useSelector } from "react-redux";


// Expand Button
import ExpandButtonActive from "../../../img/expand-btn-inactive.png";
import ExpandButtonInactive from "../../../img/expand-btn-active-min.png";


function TopNav({ videoFullMode, enableFullMode, disableFullMode }) {
  const videoToggleHandler = () => {
    if (videoFullMode) {
      disableFullMode();
    } else {
      enableFullMode();
    }
  };
	const theme = useSelector((state) => state.theme);
	const dark = theme === "dark";

  return (
    <div className={` top-nav-main ${dark ? "" : "top-nav-main-light"}`}>
      <div className={` expand-btn-wrapper ${dark ? "" : "expand-btn-wrapper-light"}`}>
        <img
          className={` expand-btn ${dark ? "" : "expand-btn-light"}`}
          src={videoFullMode ? ExpandButtonActive : ExpandButtonInactive}
          alt="Expand Video"
          onClick={videoToggleHandler}
        />
      </div>
      <div className={` brand-logo-wrapper ${dark ? "" : "brand-logo-wrapper-light"}`}>
      {dark ? (
            <BrandLogo
              fontStyles={{ fontSize: "1.15em", marginLeft: "10px" }}
              logoStyles={{ width: "30px" }}
            />
          ) : (
            <BrandLogoLight
              fontStyles={{ fontSize: "1.15em", marginLeft: "10px" }}
              logoStyles={{ width: "30px" }}
            />
          )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    videoFullMode: state.video.videoFullMode,
  };
};

const mapDispatchToProps = {
  enableFullMode,
  disableFullMode,
};

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
