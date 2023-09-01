import { defaultClothingItems } from '../../utils/constants'
import WeatherCard from '../../WeatherCard/WeatherCard'
import ItemCard from '../ItemCard/ItemCard'
import './Main.css'
import { useMemo } from 'react'

function Main({ weatherTemp, onSelectCard }) {
  const weatherType = useMemo(() => {
    if (weatherTemp >= 86) {
      return 'hot'
    } else if (weatherTemp >= 66 && weatherTemp <= 85) {
      return 'warm'
    } else if (weatherTemp <= 65) {
      return 'cold'
    }
  }, [weatherTemp])

  const filteredCards = defaultClothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType
  })

  return (
    <main className='main'>
      <WeatherCard day={false} type='moon' weatherTemp={weatherTemp} />
      <section className='card__section' id='card-section'>
        <h2 className='card__section-title'>
          Today is {weatherTemp}°F / You may want to wear:
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
