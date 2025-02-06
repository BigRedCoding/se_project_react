import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard.jsx";
import randomizeImage from "../../assets/randomizeImage.svg";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

export default function Main({
  weatherData,
  onCardClick,
  clothingItems,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const sortedItems = clothingItems.sort((a, b) => b._id - a._id);

  const itemCards = [];
  for (let i = sortedItems.length - 1; i > 0; i--) {
    const item = sortedItems[i];
    itemCards.push(
      <ItemCard
        key={i}
        id={item._id}
        item={item}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    );
  }

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">{itemCards}</ul>
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
