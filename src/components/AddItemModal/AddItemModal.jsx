import "./AddItemModal.css";
import { useState, useEffect } from "react";
import { validateInputsData } from "../../utils/validation.jsx";
import { UseFormAndValidation } from "../../Hooks/UseFormAndValidation.js";
import { UseFormAndValidation } from "../../Hooks/UseFormAndValidation.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function AddItemModal({
  onCloseClick,
  onAddItemModalSubmit,
  isOpened,
}) {
  const { values, handleChange, resetForm } = UseFormAndValidation();
  const { values, handleChange, resetForm } = UseFormAndValidation();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);

  useEffect(() => {
    const name = values.name;
    const urlText = values.urlText;
    const weatherType = values.weatherType;

    const validation = validateInputsData(name, urlText, weatherType);

    if (validation.isValid) {
      setIsSubmitVisible(true);
      setErrorMessage("");
    } else {
      setIsSubmitVisible(false);
      setErrorMessage(validation.message);
    }
  }, [values]);

  useEffect(() => {
    resetForm();
  }, [isOpened, resetForm]);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItemModalSubmit(values);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      onCloseClick={onCloseClick}
      isSubmitVisible={isSubmitVisible}
      onSubmit={handleSubmit}
      isOpened={isOpened}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          name="name"
          type="text"
          className="modal__input modal__input_name"
          id="name"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="urlText" className="modal__label">
        Image
        <input
          name="urlText"
          type="URL"
          className="modal__input modal__input_image"
          id="urlText"
          placeholder="Image Url"
          value={values.urlText || ""}
          onChange={handleChange}
          required
        />
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
            onChange={handleChange}
            checked={values.weatherType === "cold"}
          />
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
