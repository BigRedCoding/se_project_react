import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants.js";
import ItemCard from "../ItemCard/ItemCard.jsx";
import randomizeImage from "../../assets/randomizeImage.svg";

function Main({ weatherData, handleCardClick }) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp.F} °F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
      <button type="button" className="main__randomize-button">
        <img
          src={randomizeImage}
          alt="Randomize Image"
          className="main__randomize-image"
        />
        <p className="main__randomize-text">Randomize</p>
      </button>
    </main>
  );
}

export default Main;
