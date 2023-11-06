import React, { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ handleEditProfileModal, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const avatar = currentUser ? currentUser.avatar : "";
  const name = currentUser ? currentUser.name : "";
  const showAvatar = avatar !== "" ? true : false;

  return (
    <section className="sidebar">
      <div className="sidebar__user-info">
        {showAvatar ? (
          <img src={avatar} alt="avatar" className="sidebar__avatar-image" />
        ) : (
          <p className="sidebar__avatar-placeholder">
            {name[0]?.toUpperCase()}
          </p>
        )}
        <h3 className="sidebar__avatar-name">{name}</h3>
      </div>
      <div className="sidebar__buttons">
        <button
          className="sidebar__edit-button"
          onClick={handleEditProfileModal}
        >
          Change profile data
        </button>
        <button className="sidebar__logout-button" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </section>
  );
}
export default SideBar;
