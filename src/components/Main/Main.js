// import { defaultClothingItems } from '../../utils/constants'
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherTemp,
  onSelectCard,
  clothingItems,
  onCardClick,
  loggedIn,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp.temperature?.[currentTemperatureUnit] || 999;
  const getWeatherType = () => {
    if (currentTemperatureUnit === "F") {
      if (temp >= 86) {
        return "hot";
      } else if (temp >= 66 && temp <= 85) {
        return "warm";
      } else if (temp <= 65) {
        return "cold";
      }
    }
  };

  const weatherType = getWeatherType();

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  return (
    <main className="main">
      <WeatherCard
        day={true}
        type="sunny"
        weatherTemp={temp}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="card__section" id="card-section">
        <h2 className="card__section-title">
          Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        </h2>
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onSelectCard={onSelectCard}
              onCardClick={onCardClick}
              loggedIn={loggedIn}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
