import React, { useState, useEffect } from "react";
import "./messaging.scss";
import { connect, useSelector, useDispatch } from "react-redux";
import { Formik, Form, Field } from "formik";

import { addMessage, resetMessages } from "../../../redux/chat/chatActions";
import SendIcon from "../../../img/sendIcon.svg";
import EmojiIcon from "../../../img/emojiIcon.png";

import { deSelectAll_Main } from "../../../redux/elements/focus-elements/focusElementsActions";
import { setFocusText_Main } from "../../../redux/elements/focus-text/focusTextActions";

import {
  onTextChange_Main,
  removeElements_Main,
} from "../../../redux/elements/elementsActions";

// Chat Emojis
import ReactEmoji from "react-emoji";

//Emoji Picker
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const Messaging = ({
  room,
  username,
  messages,
  socket,
  addMessage,
  focus_element,
}) => {
  useEffect(() => {
    socket.on("chat-message", (data) => {
      const d = new Date();
      const hh = d.getHours();
      const ss = d.getMinutes();

      const message = data.message;
      const time = `${hh > 12 ? hh - 12 : hh}:${ss} ${hh >= 12 ? "PM" : "AM"}`;
      const username = data.username;
      addMessage({ username, message, time, room });
    });

    return () => {
      console.log("[messaging] un-mounted");
      window.location.reload();
    };
  }, []);

  // const textChangeHandler = (text) => {
  //   onTextChange_Main({ id: focus_element.id, text });
  // };

  const initialValues = {
    message: "",
  };

  const validate = (values) => {
    let errors = {};

    if (!values.message) {
      errors.message = "required";
    }

    return errors;
  };

  // Reset Form Reference
  const resetForm = React.useRef(null);

  const onSubmit = (values, { resetForm }) => {
    resetForm();
    console.log(values, room, username);
    socket.emit("chat-message", { username, room, message: values.message });
  };

  // Send message on click
  const sendMsgOnClick = (values) => {
    resetForm.current();
    console.log(values, room, username);
    socket.emit("chat-message", { username, room, message: values.message });
  };

  const myForm = React.useRef(null)

  const addEmoji = (emoji) => {
    console.log(myForm)
    // messageRef.current.value = messageRef.current.value + emoji
  };

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  return (
    <div className="messaging">
      <Chats messages={messages} />

      <div className="chat-input">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          {(formik) => {
            myForm.current = formik
            resetForm.current = formik.resetForm;
            return (
              <Form>
                <div
                  className="emoji-picker-messaging"
                  style={{
                    display: showEmojiPicker ? "block" : "none",
                  }}
                >
                  <Picker
                    style={{
                      width: "280px",
                      height: "440px",
                    }}
                    onSelect={addEmoji}
                    theme="dark"
                    title="Pick an emoji"
                    emoji="point_up"
                  />
                </div>
                <div className="input-group">
                  <Field
                    type="text"
                    name="message"
                    id="message"
                    autoComplete="off"
                    placeholder="Type Something"
                  />
                  <button
                    className="emoji-icon"
                    title="Select Emoji"
                    onClick={() => setShowEmojiPicker((e) => !e)}
                  >
                    <img src={EmojiIcon} alt="" />
                  </button>
                  <img
                    src={SendIcon}
                    className="send-icon"
                    onClick={() => {
                      if (formik.isValid) {
                        sendMsgOnClick(formik.values);
                      }
                    }}
                    alt="Send Message"
                    title="Send Message"
                  />
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

const Chats = (props) => {
  return (
    <div className="chat-messages">
      {props.messages.map((obj, index) => {
        return <Message key={index} data={obj} />;
      })}
    </div>
  );
};

const Message = (props) => {
  return (
    <div className="message">
      <p className="chat-meta">
        {props.data.username} <span className="time">{props.data.time}</span>
      </p>
      <div className="chat-content-wrapper">
        <p className="chat-content">{ReactEmoji.emojify(props.data.message)}</p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    email: state.user.email,
    messages: state.chat.messages,
  };
};

export default connect(mapStateToProps, { addMessage, resetMessages })(
  Messaging
);
