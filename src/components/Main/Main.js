// import { defaultClothingItems } from '../../utils/constants'
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
import { getTemperatureCategory } from "../../utils/temperature";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  weatherTemp,
  onSelectCard,
  clothingItems,
  onCardLike,
  loggedIn,
  weatherType,
  isDay,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temp = weatherTemp.temperature?.[currentTemperatureUnit];
  const temperatureCategory = getTemperatureCategory(
    temp,
    currentTemperatureUnit
  );

  const filteredCards = clothingItems.filter((item) => {
    return item.weather?.toLowerCase() === temperatureCategory;
  });

  return (
    <main className="main">
      <WeatherCard
        day={isDay}
        type={weatherType}
        weatherTemp={temp}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="card__section" id="card-section">
        <h2 className="card__section-title">
          Today is {temp ?? "--"}°{currentTemperatureUnit} / You may want to wear:
        </h2>
        <div className="card__items">
          {filteredCards.map((item) => (
            <ItemCard
              key={item._id || item.id}
              item={item}
              onSelectCard={onSelectCard}
              onCardLike={onCardLike}
              loggedIn={loggedIn}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main;
