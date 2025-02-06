import "./SideBar.css";

import avatarImage from "../../assets/Avatar.svg";

import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function SideBar({ onLogout, onEditProfileClick }) {
  const { userData } = useContext(CurrentUserContext);

  const userNameFirstLetter = userData?.userName?.[0].toUpperCase();
  const hasAvatar = userData?.userAvatar;

  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        {hasAvatar ? (
          <>
            <img
              src={userData.userAvatar || avatarImage}
              alt="Avatar Image"
              className="sidebar__avatar"
            />
          </>
        ) : (
          <div className="avatar__alternate">
            <p className="avatar__alternate-text">{userNameFirstLetter}</p>
          </div>
        )}
        <p className="sidebar__user-name">{`${userData.userName || ""}`}</p>
      </div>
      <button
        className="sidebar__button"
        type="button"
        onClick={onEditProfileClick}
      >
        Change profile data
      </button>
      <button className="sidebar__button" type="button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
