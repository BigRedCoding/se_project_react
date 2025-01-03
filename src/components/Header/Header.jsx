import { useState } from "react";

import "./header.css";
import logoHeader from "../../assets/logo.svg";
import avatarHeader from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [activeContainer, setActiveContainer] = useState("");

  const handleAddPanel = () => {
    setActiveContainer("user-container modal__opened");
  };
  const handleClosePanel = () => {
    setActiveContainer("");
  };
  return (
    <div className="header">
      <div className="header__logo-container">
        <img src={logoHeader} alt="wtwr° Logo" className="header__logo" />
        <p className="header__date-And-Location">
          {currentDate}, {weatherData.city}
        </p>
      </div>
      <div
        className={`header__user-container header__user-container_mod ${activeContainer}`}
      >
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-button"
        >
          + Add Clothes
        </button>
        <div className="header__user-info">
          <p className="header__user-name">Brandon Dooley</p>
          <img src={avatarHeader} alt="" className="header__user-avatar" />
        </div>
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
