import { useContext } from "react";

import "./Header.css";
import logoHeader from "../../assets/logo.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({
  onAddClick,
  onLoginClick,
  onRegistrationClick,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const { isLoggedIn, userData } = useContext(CurrentUserContext);

  const userNameFirstLetter = userData?.userName?.[0].toUpperCase();
  const hasAvatar = userData?.userAvatar;

  return (
    <div className="header">
      <div className="header__logo-container">
        <Link className="header__link" to="/">
          <img src={logoHeader} alt="wtwr° Logo" className="header__logo" />
        </Link>
        <p className="header__date-And-Location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div className={`header__user-container header__user-container_mod`}>
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              onClick={onAddClick}
              type="button"
              className="header__add-clothes-button"
            >
              + Add Clothes
            </button>
            <Link to="/profile" className="header__link">
              <div className="header__user-info">
                <p className="header__user-name">{userData?.userName || ""}</p>
                {hasAvatar ? (
                  <>
                    <img
                      src={userData.userAvatar}
                      alt="avatar image"
                      className="header__user-avatar"
                    />
                  </>
                ) : (
                  <div className="avatar__alternate">
                    <p className="avatar__alternate-text">
                      {userNameFirstLetter}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          </>
        ) : (
          <div className="header__login-and-registration">
            <button
              onClick={onRegistrationClick}
              type="button"
              className="header__registration-button"
            >
              Sign Up
            </button>
            <button
              onClick={onLoginClick}
              type="button"
              className="header__login-button"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
