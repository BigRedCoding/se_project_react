import "./AddItemModal.css";
import { useState, useEffect } from "react";
import {
  validateName,
  validateUrl,
  validateWeather,
} from "../../utils/validation.jsx";

import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function AddItemModal({
  onCloseClick,
  onAddItemModalSubmit,
  isOpened,
}) {
  const initialValues = {
    name: "",
    link: "",
    weatherType: "",
  };

  const [values, setValues] = useState({
    name: "",
    link: "",
    weatherType: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  const [nameVisibility, setNameVisibility] = useState("");
  const [urlVisibility, setUrlVisibility] = useState("");
  const [weatherVisibility, setWeatherVisibility] = useState("");

  const [validationNameMessage, setValidationNameMessage] = useState(
    "Please enter in your preferred name"
  );
  const [validationUrlMessage, setValidationUrlMessage] = useState(
    "Please enter in a valid URL for your x` image"
  );
  const [validationWeatherMessage, setValidationWeatherMessage] = useState(
    "Please select a weather type"
  );

  const handleReset = () => {
    setValues(initialValues);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    setErrorMessage("");

    const checkValidName = validateName(values.name);
    const checkValidUrl = validateUrl(values.link);
    const checkValidWeather = validateWeather(values.weatherType);

    if (values.name !== initialValues.name) {
      setNameVisibility(checkValidName.isValid ? "isHidden" : "");
      setValidationNameMessage(checkValidName.message);
    }

    if (values.link !== initialValues.link) {
      setUrlVisibility(checkValidUrl.isValid ? "isHidden" : "");
      setValidationUrlMessage(checkValidUrl.message);
    }

    if (values.weatherType !== initialValues.weatherType) {
      setWeatherVisibility(checkValidWeather.isValid ? "isHidden" : "");
      setValidationWeatherMessage(checkValidWeather.message);
    }

    if (
      checkValidUrl.isValid &&
      checkValidName.isValid &&
      checkValidWeather.isValid
    ) {
      setIsSubmitVisible(true);
    }
  }, [values]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItemModalSubmit(values);
    handleReset();
  };

  useEffect(() => {
    handleReset();
  }, [isOpened]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onCloseClick={onCloseClick}
      isSubmitVisible={isSubmitVisible}
      onSubmit={handleSubmit}
      isOpened={isOpened}
    >
      <label htmlFor="nameAddItem" className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className="modal__input modal__input_name"
          id="nameAddItem"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
        <p className={`validation__name-message ${nameVisibility}`}>
          {validationNameMessage}
        </p>
      </label>
      <label htmlFor="urlTextAddItem" className="modal__label">
        Image
        <input
          name="link"
          type="URL"
          className="modal__input modal__input_image"
          id="urlTextAddItem"
          placeholder="Image Url"
          value={values.link || ""}
          onChange={handleChange}
          required
        />
        <p className={`validation__url-message ${urlVisibility}`}>
          {validationUrlMessage}
        </p>
      </label>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <fieldset className="modal__radio-buttons">
        <legend className="modal__radio-legend">
          Select the weather type:
        </legend>
        <label htmlFor="hot">
          <input
            type="radio"
            name="weatherType"
            value="hot"
            id="hot"
            onChange={handleChange}
            checked={values.weatherType === "hot"}
          />
          Hot
        </label>
        <label htmlFor="warm">
          <input
            type="radio"
            name="weatherType"
            value="warm"
            id="warm"
            onChange={handleChange}
            checked={values.weatherType === "warm"}
          />
          Warm
        </label>
        <label htmlFor="cold">
          <input
            type="radio"
            name="weatherType"
            value="cold"
            id="cold"
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
        <p className={`validation__weather-message ${weatherVisibility}`}>
          {validationWeatherMessage}
        </p>
      </fieldset>
    </ModalWithForm>
  );
}
