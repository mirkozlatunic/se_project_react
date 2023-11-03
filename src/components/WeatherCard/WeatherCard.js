import "./WeatherCard.css";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";
import { WeatherOptions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const weatherOption = WeatherOptions.find((i) => {
    return i.day === day && i.type === type;
  });

  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const imageSrcUrl = weatherOption.url || "";
  return (
    <section className="weather " id="weather">
      <div className="weather__info">
        {weatherTemp}°{currentTemperatureUnit}
      </div>
      <img src={imageSrcUrl} className="weather__image" alt="WeatherImage" />
    </section>
  );
};

export default WeatherCard;
