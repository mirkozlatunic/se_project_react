import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ handleCloseModal, onUserChanges }) => {
  const currentUser = useContext(CurrentUserContext);
  const _id = currentUser._id;
  const token = localStorage.getItem("jwt");

  const [name, setName] = useState(currentUser.name);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setavatar] = useState(currentUser.avatar);
  const handleAvatarChange = (e) => {
    setavatar(e.target.value);
  };

  const isEnabled = name.length > 0 && avatar.length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserChanges({ name, avatar, _id, token });
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      isEnabled={isEnabled}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="name"
          name="name"
          value={name}
          onChange={handleNameChange}
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
          minLength="1"
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
