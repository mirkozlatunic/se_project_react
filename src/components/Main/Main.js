import { defaultClothingItems } from '../../utils/constants'
import WeatherCard from '../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard'
import './Main.css'
import { useMemo, useContext } from 'react'
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext'

function Main({ weatherTemp, onSelectCard }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext)
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999
  const weatherType = useMemo(() => {
    if (temp >= 86) {
      return 'hot'
    } else if (temp >= 66 && temp <= 85) {
      return 'warm'
    } else if (temp <= 65) {
      return 'cold'
    }
  }, [weatherTemp])

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType
  })

  return (
    <main className='main'>
      <WeatherCard
        day={false}
        type='moon'
        weatherTemp={temp}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className='card__section' id='card-section'>
        <h2 className='card__section-title'>
          Today is {temp}°{currentTemperatureUnit} / You may want to wear:
        </h2>
        <div className='card__items'>
          {filteredCards.map((item) => (
            <ItemCard key={item._id} item={item} onSelectCard={onSelectCard} />
          ))}
        </div>
      </section>
    </main>
  )
}
export default Main
