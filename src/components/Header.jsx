import "./Header.css";
import headerLogo from "../assets/logo.png";

function Header() {
  return (
    <div className="header">
      <img src={headerLogo} alt="App logo" className="header__logo" />
      <h1 className="header__title">Hello Vite!</h1>
    </div>
  );
}

export default Header;
