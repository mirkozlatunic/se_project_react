import React, { useState } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ handleCloseModal, onSignUpModal, onLogin }) => {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isEnabled = email.length > 0 && password.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      onClose={handleCloseModal}
      altText="or Register"
      onSubmit={handleSubmit}
      altSubmit={onSignUpModal}
      isEnabled={isEnabled}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          minLength="1"
        ></input>
      </label>
      <label className="modal__label">
        Password
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
    </ModalWithForm>
  );
};

export default LoginModal;
