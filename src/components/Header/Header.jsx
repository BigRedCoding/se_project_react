import "./header.css";
import logoHeader from "../../assets/logo.svg";
import avatarHeader from "../../assets/avatar.svg";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="header">
      <img src={logoHeader} alt="" className="header__logo" />
      <p className="header__date-And-Location">
        {currentDate}, {weatherData.city}
      </p>
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
    </div>
  );
}

export default Header;
