import React, { useContext } from "react";
import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar({ onEditProfile, onLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const avatarImage = currentUser.avatar;
  const avatarImageExist =
    currentUser.avatar !== undefined || currentUser.avatar !== null;
  console.log(avatarImageExist);
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
          <h3 className="sidebar__avatar-letter">
            {currentUser.name.charAt(0).toUpperCase()}
          </h3>
        )}
        <h3 className="sidebar__avatar-name">{currentUser.name}</h3>
      </div>
      <h3 className="sidebar__options" onClick={onEditProfile}>
        Change profile data
      </h3>
      <h3 className="sidebar__options" onClick={onLogOut}>
        Log out
      </h3>
    </section>
  );
}
export default SideBar;
