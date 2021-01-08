import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./dashboard.scss";

import Rodal from "rodal";
import "rodal/lib/rodal.css";

// API 😄
import {
  loadIBS,
  createIBS,
  deleteIBS,
} from "../../redux/idea-boards/ideaBoardsActions";

// Components
import BrandLogo from "../brand-logo/brand-logo";
import DashboardCards from "./dashboard-cards/dashboard-cards";
import User from "../user/user";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import Collaborators from "./collaborators/collaborators";

// Logos
import AddBtn from "../../img/add-button.svg";
import Idea from "../../img/idea.svg";

const initialValues = {
  idea_board_name: "",
  idea_board_description: "",
};

const validate = (values) => {
  let errors = {};

  if (!values.idea_board_name) {
    errors.idea_board_name = "Required";
  } else if (values.idea_board_name.length >= 20) {
    errors.idea_board_name = "Name too long";
  }

  if (!values.idea_board_description) {
    errors.idea_board_description = "Required";
  } else if (values.idea_board_description.length > 30) {
    errors.ide_board_description = "Description too long";
  }

  return errors;
};

const TextError = (props) => <div className="error-msg">{props.children}</div>;

function Dashboard({ idea_boards, loadIBS, createIBS, deleteIBS }) {
  // Visibility toggle for 'Create New IdeaBoard' Modal
  const [visible, setVisible] = useState(false);

  // Reset Form Reference
  const resetForm = React.useRef(null);

  const [editModal, setEditModal] = useState({
    id: "",
    visible: false,
  });
  const [deleteModal, setDeleteModal] = useState({
    id: "",
    board_name: "",
    visible: false,
  });

  const customStyles = {
    wrapper: {
      background: 'linear-gradient( 180deg, rgba(3,3, 3, 0.8), rgba(3,3, 3, 0.6))',
      borderLeft: '1px solid rgba(234,236,239, 0.15)',
      borderTop: '1px solid rgba(234,236,239, 0.15)',
      borderRight: '1px solid rgba(234,236,239, 0.1)',
      borderBottom: '1px solid rgba(234,236,239, 0.1)',
      backdropFilter: 'blur(20px)',
      borderRadius: '10px',
    },
  };

  useEffect(() => {
    document.title = "Craft Dash | Dashboard";
    loadIBS();
  }, [loadIBS]);

  // Modal form onSubmit Handler for creating a new IdeaBoard (IdeaBoard Name, Description)
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    createIBS(values);
    resetForm();
    setVisible((preVal) => !preVal);
  };

  // Delete Handler
  const deleteHandler = (id, board_name, visible) => {
    console.log(`[deleteHandler] ${(id, board_name, visible)}`);

    setDeleteModal({
      id,
      board_name,
      visible,
    });
  };

  // Edit Handler
  const editHandler = (id, visible) => {
    console.log(`[editHandler] ${(id, visible)}`);

    setEditModal({
      id,
      visible,
    });
  };

  // optionsBtn Handler
  const optionsBtnHandler = (action) => {
    if (action === "YES") {
      deleteIBS(deleteModal.id);
    } else {
      setDeleteModal({ ...deleteModal, visible: false });
    }
  };

  return (
    <div className="dashboard">
      <div className="top-nav">
        <div className="brand-logo-wrapper">
          <BrandLogo
            fontStyles={{ fontSize: "1.4em", marginLeft: "10px" }}
            logoStyles={{ width: "30px" }}
          />
        </div>
        <div className="add-btn">
          <img
            src={AddBtn}
            onClick={() => setVisible(true)}
            alt="Create New Idea Board"
          />
        </div>
        <div className="user-wrapper">
          <User />
        </div>
      </div>

      <div className="dashboard-title">
        <h1>Dashboard</h1>
      </div>

      <div className="dashboard-cards-wrapper">
        {idea_boards.boards.data.length !== 0
          ? idea_boards.boards.data.map((idea_board) => {
              return (
                <DashboardCards
                  key={idea_board._id}
                  _id={idea_board._id}
                  title={`${idea_board.idea_board_name}`}
                  deleteHandler={deleteHandler}
                  editHandler={editHandler}
                />
              );
            })
          : null}
      </div>

      <Rodal
        visible={editModal.visible}
        onClose={() => setEditModal({ ...editModal, visible: false })}
        animation="fade"
        width={720}
        height={600}
        customStyles={customStyles.wrapper}
      >
        <Collaborators idea_board_id={`${editModal.id}`} />
      </Rodal>

      <Rodal
        visible={deleteModal.visible}
        onClose={() => setDeleteModal({ ...deleteModal, visible: false })}
        animation="fade"
        width={450}
        height={200}
        customStyles={customStyles.wrapper}
      >
        <div className="delete-modal">
          {idea_boards.delete_board.info &&
          idea_boards.delete_board.info._id === deleteModal.id ? (
            <h2 className="post-delete">
              <b>{idea_boards.delete_board.info.idea_board_name}</b> Deleted
              Successfully
            </h2>
          ) : (
            <h2 className="pre-delete">
              Are you sure you want to delete IdeaBoard -{" "}
              <b>{deleteModal.board_name}?</b>
            </h2>
          )}

          <div className="yn">
            {idea_boards.delete_board.isLoading ? (
              <LoadingSpinner color="#0087cc" />
            ) : idea_boards.delete_board.info &&
              idea_boards.delete_board.info._id === deleteModal.id ? null : (
              <div>
                <button
                  className="yes"
                  onClick={() => optionsBtnHandler("YES")}
                >
                  YES
                </button>
                <button className="no" onClick={() => optionsBtnHandler("NO")}>
                  NO
                </button>
              </div>
            )}
          </div>
        </div>
      </Rodal>

      <Rodal
        visible={visible}
        onClose={() =>
          setVisible((preVal) => {
            resetForm.current();
            return !preVal;
          })
        }
        animation="fade"
        width={450}
        height={480}
        customStyles={customStyles.wrapper}
      >
        <div className="ideaboard-modal">
          <div className="ideaboard-header">
            <img src={Idea} alt="Idea" />
            <h1 className="ideaboard-title">Create New IdeaBoard</h1>
          </div>
          <div className="idea-board-form">
            <Formik
              initialValues={initialValues}
              validate={validate}
              onSubmit={onSubmit}
            >
              {(formik) => {
                resetForm.current = formik.resetForm;
                return (
                  <Form>
                    <div className="input-group">
                      <label htmlFor="idea_board_name">
                        IdeaBoard name <span className="asterisk">*</span>
                      </label>
                      <Field
                        type="text"
                        name="idea_board_name"
                        id="idea_board_name"
                        autoComplete="off"
                        disabled={idea_boards.new_board.isLoading}
                      />
                      <div className="error-msg-wrapper">
                        <ErrorMessage
                          name="idea_board_name"
                          component={TextError}
                        />
                      </div>
                    </div>
                    <div className="input-group">
                      <label htmlFor="idea_board_description">
                        Description <span className="asterisk">*</span>
                      </label>
                      <Field
                        as="textarea"
                        name="idea_board_description"
                        id="idea_board_name"
                        autoComplete="off"
                        disabled={idea_boards.new_board.isLoading}
                      />
                      <div className="error-msg-wrapper">
                        <ErrorMessage
                          name="idea_board_description"
                          component={TextError}
                        />
                      </div>
                    </div>
                    <div className="create-btn">
                      {idea_boards.new_board.isLoading ? (
                        <LoadingSpinner color="#0087cc" />
                      ) : (
                        <button type="submit">Create</button>
                      )}
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </Rodal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    idea_boards: state.idea_boards,
  };
};

export default connect(mapStateToProps, { loadIBS, createIBS, deleteIBS })(
  Dashboard
);
