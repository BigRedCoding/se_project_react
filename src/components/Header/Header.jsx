import { useState } from "react";

import "./Header.css";
import logoHeader from "../../assets/logo.svg";
import avatarHeader from "../../assets/avatar.svg";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { Link } from "react-router-dom";

function Header({ onAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [activeContainer, setActiveContainer] = useState("");

  const handleAddPanel = () => {
    setActiveContainer("user-container modal_opened");
  };
  const handleClosePanel = () => {
    setActiveContainer("");
  };
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
      <div
        className={`header__user-container header__user-container_mod ${activeContainer}`}
      >
        <ToggleSwitch />
        <button
          onClick={onAddClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add Clothes
        </button>
        <Link to="/profile" className="header__link">
          <div className="header__user-info">
            <p className="header__user-name">Brandon Dooley</p>
            <img
              src={avatarHeader}
              alt="avatar image"
              className="header__user-avatar"
            />
          </div>
        </Link>
        <button
          onClick={handleClosePanel}
          type="button"
          className="header__user-close-button"
        ></button>
      </div>
      <button
        onClick={handleAddPanel}
        type="button"
        className="header__panel-button"
      ></button>
    </div>
  );
}

export default Header;
