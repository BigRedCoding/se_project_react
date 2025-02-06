import "./EditProfileModal.css";

import { useState, useEffect, useContext } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

import { handleUpdateProfile } from "../../utils/api.js";

export default function EditProfileModal({
  onCloseClick,
  isOpened,
  updateContext,
}) {
  const { userData } = useContext(CurrentUserContext);

  const token = localStorage.getItem("jwt");

  const initialValues = {
    name: userData?.userName || "",
    urlText: userData?.userAvatar || "",
  };

  const [values, setValues] = useState({
    name: "",
    urlText: "",
  });

  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (
      values.name !== initialValues.name ||
      values.urlText !== initialValues.urlText
    ) {
      setIsSubmitVisible(true);
    }
  }, [values]);

  const resetForm = () => {
    setValues(initialValues);
    setIsSubmitVisible(false);
  };

  useEffect(() => {
    resetForm();
  }, [isOpened]);

  const updateUserInfo = () => {
    let userData = JSON.parse(localStorage.getItem("userData"));

    userData.userName = values.name;
    userData.userAvatar = values.urlText;

    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleUpdateProfile(values, token);
    updateUserInfo();
    updateContext();
    onCloseClick();
  };

  const handleOpenSignup = () => {
    isSignInOpen();
    onCloseClick();
  };

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes "
      onCloseClick={onCloseClick}
      isSubmitVisible={isSubmitVisible}
      onSubmit={handleSubmit}
      isOpened={isOpened}
      onOpenSignup={handleOpenSignup}
    >
      <label htmlFor="nameEditProfile" className="modal__label">
        Name*
        <input
          name="name"
          type="text"
          className="modal__input modal__input_name"
          id="nameEditProfile"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>

      <label htmlFor="imageUrlEditProfile" className="modal__label">
        Avatar URL*
        <input
          name="urlText"
          type="URL"
          className="modal__input modal__input_image"
          id="imageUrlEditProfile"
          placeholder="Avatar URL"
          value={values.urlText || ""}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}
