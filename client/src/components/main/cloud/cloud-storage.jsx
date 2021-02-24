import React, { useState } from "react";
import BrandLogo from "../../brand-logo/brand-logo";
import User from "../../user/user";
import "./cloud-storage.scss";

import AddFilesButton from "../../../img/AddFilesButton.png";
import FilesButton from "../../../img/Files.png";
import AudioButton from "../../../img/Audio.png";
import NotesButton from "../../../img/Notes.png";

function CloudStorage() {
  const [showButtons, setButtonVisibility] = useState(false);
  return (
    <div className="cloud-storage">
      <div className="top-nav">
        <div className="brand-logo-wrapper">
          <BrandLogo
            fontStyles={{ fontSize: "1.4em", marginLeft: "10px" }}
            logoStyles={{ width: "30px" }}
          />
        </div>
        <div className="user-wrapper">
          <User />
        </div>
      </div>
      <div className="ideaboard-name">
        <h1>IdeaBoardNameHere</h1>
      </div>
      <div className="add-button-wrapper">
        <div className="add-button-base">
          <div
            className="notes-button"
            style={{
              transform: showButtons
                ? "scale(1) rotate(0deg)"
                : "scale(0) rotate(-180deg)",
              transition: "0.5s ease-in-out",
            }}
          >
            <img src={NotesButton} alt="Add Notes" title="Add Notes" />
          </div>
          <div
            className="audio-button"
            style={{
              transform: showButtons
                ? "scale(1) rotate(0deg)"
                : "scale(0) rotate(-180deg)",
              transition: "0.5s ease-in-out",
            }}
          >
            <img
              src={AudioButton}
              alt="Add Audio Files"
              title="Add Audio Files"
            />
          </div>
          <div
            className="files-button"
            style={{
              transform: showButtons
                ? "scale(1) rotate(0deg)"
                : "scale(0) rotate(-180deg)",
              transition: "0.5s ease-in-out",
            }}
          >
            <img src={FilesButton} alt="Add New Files" title="Add New Files" />
          </div>
          <div className="add-button">
            <img
              src={AddFilesButton}
              alt="Add to Cloud"
              title="Add to Cloud"
              style={{
                transform: showButtons ? "rotate(135deg)" : "rotate(0deg)",
                transition: "0.5s ease-in-out",
              }}
              onClick={() => setButtonVisibility(!showButtons)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CloudStorage;
