import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ handleCloseModal, onSignUp, onLogInModal }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setAvatar] = useState("");
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isEnabled = name.length > 0 && email.length > 0 && password.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignUp({ name, avatar, email, password });
  };

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Next"
      onClose={handleCloseModal}
      altText="or Log in"
      onSubmit={handleSubmit}
      altSubmit={onLogInModal}
      isEnabled={isEnabled}
    >
      <label className="modal__label">
        Email*
        <input
          className="modal__input"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          minLength="1"
          required
        ></input>
      </label>
      <label className="modal__label">
        Password*
        <input
          className="modal__input"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Password"
          minLength="1"
          maxLength="30"
          required
        ></input>
      </label>
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder="Name"
          minLength="1"
          maxLength="30"
        ></input>
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="link"
          value={avatar}
          onChange={handleAvatarChange}
          placeholder="Avatar URL"
          minLength="1"
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
