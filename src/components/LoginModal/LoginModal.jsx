import "./LoginModal.css";

import { useState, useEffect, useContext } from "react";
import { validateEmail, validatePassword } from "../../utils/validation.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function LoginModal({
  onCloseClick,
  onLoginUser,
  isOpened,
  onRegistrationClick,
  onLoginResponseInfo,
  onIsPasswordValid,
}) {
  const { isPasswordValid } = useContext(CurrentUserContext);

  const initialValues = {
    email: "",
    password: "",
    name: "",
    urlText: "",
    weatherSelected: true,
  };

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(
    "Please enter information into the fields above"
  );
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  const [isModalModified, setIsModalModified] = useState(false);

  const [emailVisibility, setEmailVisibility] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("");

  const [validationEmailMessage, setValidationEmailMessage] = useState(
    "Please enter your email"
  );
  const [validationPasswordMessage, setValidationPasswordMessage] = useState(
    "Please enter you password"
  );

  const isSecondButtonVisible = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    checkValidity();
  };

  const resetForm = () => {
    setValues(initialValues);
    setIsSubmitVisible(false);
    setErrorMessage("");
  };

  const checkValidity = () => {
    setErrorMessage("");

    const checkValidEmail = validateEmail(values.email);
    const checkValidPassword = validatePassword(values.password);

    if (checkValidEmail.isValid !== (emailVisibility === "isHidden")) {
      setEmailVisibility(checkValidEmail.isValid ? "isHidden" : "");
    }

    if (checkValidPassword.isValid !== (passwordVisibility === "isHidden")) {
      setPasswordVisibility(checkValidPassword.isValid ? "isHidden" : "");
    }

    if (validationEmailMessage !== checkValidEmail.message) {
      setValidationEmailMessage(checkValidEmail.message);
    }

    if (validationPasswordMessage !== checkValidPassword.message) {
      setValidationPasswordMessage(checkValidPassword.message);
    }

    if (
      checkValidEmail.isValid &&
      checkValidPassword.isValid &&
      !isSubmitVisible
    ) {
      setIsSubmitVisible(true);
    } else if (!(checkValidEmail.isValid && checkValidPassword.isValid)) {
      setIsSubmitVisible(false);
    }
  };

  useEffect(() => {
    setIsModalModified((prevState) => !prevState);
  }, [isPasswordValid]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLoginUser(values)
      .then(() => {
        onLoginResponseInfo();
        resetForm();
        onCloseClick();
        onIsPasswordValid(true);
      })
      .catch(() => {
        setErrorMessage("Invalid username or password");
        onIsPasswordValid(false);
      });
  };
  const handleOpenSignup = () => {
    onRegistrationClick();
  };
  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isSecondButtonVisible={isSecondButtonVisible}
      buttonText2="Sign Up"
      onCloseClick={onCloseClick}
      isSubmitVisible={isSubmitVisible ?? false}
      onSubmit={handleSubmit}
      isOpened={isOpened}
      onOpenSignup={handleOpenSignup}
    >
      <label htmlFor="emailLogin" className="modal__label">
        Email
        <input
          name="email"
          type="email"
          className="modal__input modal__input_email"
          id="emailLogin"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
        <p className={`validation__email-message ${emailVisibility}`}>
          {validationEmailMessage}
        </p>
      </label>

      <label
        htmlFor="password"
        className={`modal__label ${
          isModalModified ? "password__modal_mod" : ""
        }`}
      >
        {isPasswordValid ? (
          <p className="password__text">Password</p>
        ) : (
          <p className="password__text">Incorrect password</p>
        )}
        <input
          name="password"
          type="password"
          className={`modal__input ${
            isModalModified ? "password__modal_mod" : ""
          }`}
          id="password"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
        <p className={`validation__password-message ${passwordVisibility}`}>
          {validationPasswordMessage}
        </p>
      </label>

      <p className="modal__error-message">{errorMessage}</p>
    </ModalWithForm>
  );
}
