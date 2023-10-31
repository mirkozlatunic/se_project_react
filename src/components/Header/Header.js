import "./Header.css";
import Logo from "../../images/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";

const Header = ({
  onCreateModal,
  weatherLocation,
  onSignUpModal,
  onLogInModal,
  loggedIn,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const avatar = currentUser ? currentUser?.avatar : "";
  const name = currentUser ? currentUser?.name : "";
  const showAvatar = avatar !== "" ? true : false;
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__menu-left">
        <div>
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
        </div>
        <div className="header__date-location">
          {currentDate}, {weatherLocation}
        </div>
      </div>
      <div className="header__logo">
        <ToggleSwitch />
        {loggedIn ? (
          <div className="header__avatar-logo">
            <button
              type="text"
              onClick={onCreateModal}
              className="header__add-button"
            >
              + Add clothes
            </button>
            <Link className="header__name" to="/profile">
              {currentUser?.name}
            </Link>
            <div>
              {showAvatar ? (
                <img src={avatar} alt="avatar" className="header__avatar" />
              ) : (
                <p className="sidebar__avatar-placeholder">
                  {/* {name[0]?.toUpperCase()} */}T
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="header__registration">
            <button className="header__reg-button" onClick={onSignUpModal}>
              Sign Up
            </button>
            <button className="header__reg-button" onClick={onLogInModal}>
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
