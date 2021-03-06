import React from "react";
import { server } from "../../../../utils/api";

import OpenFileIcon from "../../../../img/open_file.svg";

// Styles
import "./my-file-node.scss";

function MyFileNode({ file_name, file_type, original_file_name }) {
  return (
    <div className="my-file-node">
      <DisplayContent
        file_name={file_name}
        file_type={file_type}
        original_file_name={original_file_name}
      />
    </div>
  );
}

const DisplayContent = ({ file_name, file_type, original_file_name }) => {
  return (
    <div className="display-content">
      <FileTypeHandler
        file_name={file_name}
        file_type={file_type}
        original_file_name={original_file_name}
      />
    </div>
  );
};

const FileTypeHandler = ({ file_name, file_type, original_file_name }) => {
  // Splitting the MIME type
  const type_arr = file_type.split("/");

  const type_p1 = type_arr[0];
  const type_p2 = type_arr[1];

  if (type_p1 === "image") {
    if (type_p2 !== "svg+xml") {
      return (
        <div
          className="image-file"
          style={{
            background: `url('${server}/api/cloud-storage/get-file/${file_name}') center no-repeat`,
            backgroundSize: "cover",
          }}
        >
          {/* <h1>Dummy Text</h1> */}
          <div className="icon-wrapper">
            <img src={OpenFileIcon} />
          </div>
        </div>
      );
    }
  } else if (type_p1 === "audio") {
    return (
      <div className="audio">
        <audio controls>
          <source
            src={`${server}/api/cloud-storage/get-file/${file_name}`}
            type={file_type}
          />
        </audio>
        <h2>{original_file_name}</h2>
      </div>
    );
  }
};

export default MyFileNode;
