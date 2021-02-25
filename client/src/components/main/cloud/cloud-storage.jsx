import React, { useState } from "react";
import BrandLogo from "../../brand-logo/brand-logo";
import User from "../../user/user";
import "./cloud-storage.scss";

import AddFilesButton from "../../../img/AddFilesButton.png";
import FilesButton from "../../../img/Files.png";
import AudioButton from "../../../img/Audio.png";
import NotesButton from "../../../img/Notes.png";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import CraftDashCloudLogo from "../../../img/CraftDashCloudLogo.png";
import FileAddIcon from "../../../img/folder-add.png";

function CloudStorage() {
  const [showButtons, setButtonVisibility] = useState(false);
  const [showFilesModal, setFilesModalVisibility] = useState(false);
  const [showAudioModal, setAudioModalVisibility] = useState(false);

  const customStyles = {
    wrapper: {
      backgroundColor: "#1F2023",
      background:
        "linear-gradient(144.37deg, rgba(22, 22, 22, 0.86) 0%, rgba(22, 22, 22, 0.757406) 6.67%, rgba(23, 23, 23, 0.749347) 13.33%, rgba(23, 23, 23, 0.635502) 20%, rgba(24, 24, 24, 0.615777) 26.67%, rgba(24, 25, 25, 0.590468) 33.33%, rgba(25, 26, 27, 0.560435) 40%, rgba(26, 27, 28, 0.527193) 46.67%, rgba(27, 28, 29, 0.492807) 53.33%, rgba(28, 29, 31, 0.459565) 60%, rgba(29, 30, 32, 0.429532) 66.67%, rgba(30, 31, 33, 0.404223) 73.33%, rgba(30, 31, 34, 0.384498) 80%, rgba(31, 32, 35, 0.370653) 86.67%, rgba(31, 32, 35, 0.362594) 93.33%, rgba(31, 32, 35, 0.36) 100%)",
      borderLeft: "1px solid rgba(234,236,239, 0.3)",
      borderTop: "1px solid rgba(234,236,239, 0.3)",
      borderRight: "1px solid rgba(234,236,239, 0.2)",
      borderBottom: "1px solid rgba(234,236,239, 0.2)",
      borderRadius: "5px",
    },
  };
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
      <Rodal
        visible={showFilesModal}
        animation="fade"
        width={1000}
        height={700}
        onClose={() => setFilesModalVisibility(false)}
        className="rodal-cloud-bg"
        customStyles={customStyles.wrapper}
      >
        <div className="cdc-logo-wrapper">
          <img
            src={CraftDashCloudLogo}
            alt="Craft Dash Cloud"
            title="Craft Dash Cloud"
          />
        </div>
        <div className="files-field-wrapper">
          <div className="label-row-1">
            <p>Upload Your Files Here</p>
          </div>
          <div className="upload-button">
            <span>
              <input type="file" id="browse-file" />
              <img src={FileAddIcon} alt="" />
              <label for="browse-file">Browse Files</label>
            </span>
          </div>
          <div className="label-row-2">
            <p>All documents and images are supported</p>
          </div>
        </div>
      </Rodal>
      <Rodal
        visible={showAudioModal}
        animation="fade"
        width={1000}
        height={700}
        onClose={() => setAudioModalVisibility(false)}
        className="rodal-cloud-bg"
        customStyles={customStyles.wrapper}
      >
        <div className="cdc-logo-wrapper">
          <img
            src={CraftDashCloudLogo}
            alt="Craft Dash Cloud"
            title="Craft Dash Cloud"
          />
        </div>
        <div className="files-field-wrapper">
          <div className="label-row-1">
            <p>Upload Your Audio Files Here</p>
          </div>
          <div className="upload-button">
            <span>
              <input type="file" id="browse-file" />
              <img src={FileAddIcon} alt="" />
              <label for="browse-file">Browse Files</label>
            </span>
          </div>
          <div className="label-row-2">
            <p>Supported Files are mp3, aac, m4a</p>
          </div>
        </div>
      </Rodal>
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
              onClick={() => setAudioModalVisibility(true)}
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
            <img
              src={FilesButton}
              alt="Add New Files"
              title="Add New Files"
              onClick={() => setFilesModalVisibility(true)}
            />
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
