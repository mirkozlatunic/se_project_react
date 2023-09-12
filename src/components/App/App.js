import './App.css'
import Header from '../Header/Header'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
// import ModalWithForm from '../ModalWithForm/ModalWithForm'
import ItemModal from '../ItemModal/ItemModal'
import { useState, useEffect } from 'react'
import {
  getForcastWeather,
  parseWeatherData,
  parseLocationData,
} from '../../utils/weatherApi'
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext'
import { Switch, Route } from 'react-router-dom'
import Profile from '../Profile/Profile'
import AddItemModal from '../AddItemModal/AddItemModal'
import {
  deleteClothingItems,
  getClothingItems,
  postNewClothingItem,
} from '../../utils/api'

function App() {
  const [activeModal, setActiveModal] = useState('')
  const [selectedCard, setSelectedCard] = useState({})
  const [clothingItems, setClothingItems] = useState([])
  // const [newClothingItem, setNewClothingItem] = useState({})
  const [weatherLocation, setWeatherLocation] = useState('')
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

  // const onAddItem = (e) => {
  //   e.preventDefault()
  // }

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F')
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C')
  }

  const handleAddItemSubmit = (values) => {
    const newItem = {
      name: values.name,
      link: values.link,
      weather: values.weatherType,
    }
    postNewClothingItem(newItem)
      .then((item) => {
        setClothingItems([item, ...clothingItems])
        handleCloseModal()
      })
      .catch(console.error)
  }

  const handleDeleteItemSubmit = (selectedCard) => {
    deleteClothingItems(selectedCard)
      .then((res) => {
        const newClothingItems = clothingItems.filter((cards) => {
          return cards._id !== selectedCard._id
        })
        setClothingItems(newClothingItems)
        handleCloseModal()
      })
      .catch(console.error)
  }

  useEffect(() => {
    getForcastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data)
        const location = parseLocationData(data)
        setTemp(temperature)
        setWeatherLocation(location)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    if (!activeModal) return // stop the effect not to add the listener if there is no active modal
    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === 'Escape') {
        handleCloseModal()
      }
    }
    document.addEventListener('keydown', handleEscClose)
    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [activeModal])

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <Header
        onCreateModal={handleCreateModal}
        weatherTemp={temp}
        weatherLocation={weatherLocation}
      />
      <Switch>
        <Route exact path='/'>
          <Main
            weatherTemp={temp}
            onSelectCard={handleSelectedCard}
            clothingItems={clothingItems}
          />
        </Route>
        <Route path='/profile'>
          <Profile
            onCreateModal={handleCreateModal}
            clothingItems={clothingItems}
            onSelectCard={handleSelectedCard}
          />
        </Route>
      </Switch>
      <Footer />
      {activeModal === 'create' && (
        <AddItemModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === 'create'}
          onAddItem={handleAddItemSubmit}
          onClose={handleCloseModal}
        />
      )}
      {activeModal === 'preview' && (
        <ItemModal
          selectedCard={selectedCard}
          onClose={handleCloseModal}
          onDeleteItem={handleDeleteItemSubmit}
        />
      )}
    </CurrentTemperatureUnitContext.Provider>
  )
}

export default App
