import "./SideBar.css";

import avatarImage from "../../assets/Avatar.svg";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <img src={avatarImage} alt="Avatar Image" className="sidebar__avatar" />
        <p className="sidebar__user-name">Brandon Dooley</p>
      </div>
    </div>
  );
}
