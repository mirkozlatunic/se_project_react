import React, { useState, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  handleCloseModal,
  onSubmit,
  isLoading,
  isOpen,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [avatar, setavatar] = useState(currentUser.avatar);
  const handleAvatarChange = (e) => {
    setavatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: name, avatar: avatar });
  };

  return (
    <ModalWithForm
      buttonText={isLoading ? "Submitting Changes..." : "Submit Changes"}
      onClose={handleCloseModal}
      onSubmit={handleSubmit}
      isOpen={isOpen}
    >
      <h2>Change profile Data</h2>
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="name"
          name="name"
          value={name}
          onChange={handleNameChange}
          placeholder={name}
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
          placeholder={avatar}
          minLength="1"
        ></input>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
