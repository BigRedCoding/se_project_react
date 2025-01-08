import { useState, useEffect } from "react";

import { coordinates, APIKey } from "../../utils/constants.js";
import "./App.css";
import Header from "../header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherapi.js";
import { useFormAndValidation } from "../../utils/validation.jsx";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 }, //, C: 999 }, <--For the next part of the Project
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleAddClick = () => {
    setActiveModal("garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectCard(card);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [url, setUrl] = useState("");
  const [isSubmitVisible, setIsSubmitVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validation = useFormAndValidation(text1, text2, url);

    if (validation.isValid) {
      setIsSubmitVisible(true);
      setErrorMessage("");
    } else {
      setIsSubmitVisible(false);
      setErrorMessage(validation.message);
    }
  }, [text1, text2, url]);

  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);

        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleToggleSwitchChange={handleToggleSwitchChange}
          />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
        </div>
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          activeModal={activeModal}
          handleCloseClick={closeActiveModal}
          isSubmitVisible={isSubmitVisible}
          setIsValid={setIsValid}
          text1={text1}
          text2={text2}
          url={url}
          isOpened={activeModal === "garment" && "modal_opened"}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              name="name"
              type="text"
              className="modal__input modal__input_name"
              id="name"
              placeholder="Name"
              value={text1}
              onChange={(e) => {
                setText1(e.target.value);
              }}
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
              value={text2}
              onChange={(e) => {
                setText2(e.target.value);
                setUrl(e.target.value);
              }}
              required
            />
          </label>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
          <fieldset className="modal__radio-buttons" required>
            <legend className="modal__radio-legend">
              Select the weather type:
            </legend>
            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="hot"
                defaultChecked
                name="weather-type"
              />
              <span className="modal__radio-text">Hot</span>
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="warm"
                name="weather-type"
              />
              <span className="modal__radio-text">Warm</span>
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input
                type="radio"
                className="modal__radio-input"
                id="cold"
                name="weather-type"
              />
              <span className="modal__radio-text">Cold</span>
            </label>
          </fieldset>
        </ModalWithForm>
        <ItemModal
          activeModal={activeModal}
          selectedCard={selectedCard}
          handleCloseClick={closeActiveModal}
          isOpened={activeModal === "preview" && "modal_opened"}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
