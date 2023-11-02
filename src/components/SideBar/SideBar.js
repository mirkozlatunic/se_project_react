import React, { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileModal, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarImage = currentUser ? currentUser.avatar : undefined;
  const name = currentUser ? currentUser.name : "";
  const avatarImageExist = avatarImage !== "" ? true : null;
  return (
    <section className="sidebar">
      <div className="sidebar__user-info">
        {avatarImageExist ? (
          <img
            src={avatarImage}
            alt="avatar"
            className="sidebar__avatar-image"
          />
        ) : (
          <p className="sidebar__avatar-placeholder">
            {name[0]?.toUpperCase()}
          </p>
        )}
        <h3 className="sidebar__avatar-name">{name}</h3>
      </div>
      <button className="sidebar__edit-button" onClick={handleEditProfileModal}>
        Change profile data
      </button>
      <button className="sidebar__logout-button" onClick={handleLogOut}>
        Log out
      </button>
    </section>
  );
}
export default SideBar;
