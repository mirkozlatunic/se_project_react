import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal'
import { useState, useEffect } from 'react'
import { getForcastWeather, parseWeatherData } from '../../utils/weatherApi'
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext'

function App() {
  const [activeModal, setActiveModal] = useState('')
  const [selectedCard, setSelectedCard] = useState({})
  const [temp, setTemp] = useState(0)
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F')
  const handleCreateModal = () => {
    setActiveModal('create')
  }
  const handleCloseModal = () => {
    setActiveModal('')
  }
  const handleSelectedCard = (card) => {
    setActiveModal('preview')
    setSelectedCard(card)
  }

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F')
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C')
  }

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data)
        setTemp(temperature)
      })
      .catch(console.error)
  }, [])

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} />
        <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
        <Footer />
        {activeModal === 'create' && (
          <ModalWithForm title='New Garment' onClose={handleCloseModal}>
            <div className='modal__text-inputs'>
              <label className='modal__label'>
                Name
                <input
                  type='text'
                  name='name'
                  minLength='1'
                  maxLength='30'
                  className='modal__input'
                  placeholder='Name'
                />
              </label>
              <label className='modal__label'>
                Image
                <input
                  type='url'
                  name='link'
                  minLength='1'
                  maxLength='30'
                  className='modal__input'
                  placeholder='Image'
                />
              </label>
            </div>
            <p className='modal__select-weather'>Select the weather type:</p>
            <div className='modal__radio-inputs'>
              <div className='modal__radio-set'>
                <input
                  type='radio'
                  id='hot'
                  value='hot'
                  className='modal__radio-button'
                  name='radio-button-weather'
                />
                <label className='modal__radio-button-label'>Hot</label>
              </div>
              <div className='modal__radio-set'>
                <input
                  type='radio'
                  id='warm'
                  value='warm'
                  className='modal__radio-button'
                  name='radio-button-weather'
                />
                <label className='modal__radio-button-label'>Warm</label>
              </div>
              <div className='modal__radio-set'>
                <input
                  type='radio'
                  id='cold'
                  value='cold'
                  className='modal__radio-button'
                  name='radio-button-weather'
                />
                <label className='modal__radio-button-label'>Cold</label>
              </div>
            </div>
          </ModalWithForm>
        )}
        {activeModal === 'preview' && (
          <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  )
}

export default App
