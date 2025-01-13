import "./AddItemModal.css";
import { useState, useEffect } from "react";
import { useFormAndValidation } from "../../utils/validation.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";

export default function AddItemModal({
  onCloseClick,
  onAddItemModalSubmit,
  isOpened,
}) {
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState("");
  const [urlText, setUrlText] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleURLChange = (e) => {
    setUrlText(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setIsOptionSelected(true);
    setWeatherType(e.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItemModalSubmit({ name, urlText, weatherType });
    setName("");
    setUrlText("");
    setWeatherType("");
  };

  useEffect(() => {
    const validation = useFormAndValidation(name, urlText, isOptionSelected);

    if (validation.isValid) {
      setIsSubmitVisible(true);
      setErrorMessage("");
    } else {
      setIsSubmitVisible(false);
      setErrorMessage(validation.message);
    }
  }, [name, urlText, isOptionSelected]);

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
        Name{" "}
        <input
          name="name"
          type="text"
          className="modal__input modal__input_name"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          name="imageUrl"
          type="URL"
          className="modal__input modal__input_image"
          id="imageUrl"
          placeholder="Image Url"
          value={urlText}
          onChange={handleURLChange}
          required
        />
      </label>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      <fieldset className="modal__radio-buttons" required>
        <legend className="modal__radio-legend">
          Select the weather type:
        </legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="weather-type"
            value="hot"
            onChange={handleWeatherChange}
            checked={weatherType === "hot"}
          />
          <span className="modal__radio-text">Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather-type"
            value="warm"
            checked={weatherType === "warm"}
            onChange={handleWeatherChange}
          />
          <span className="modal__radio-text">Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weather-type"
            value="cold"
            checked={weatherType === "cold"}
            onChange={handleWeatherChange}
          />
          <span className="modal__radio-text">Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
