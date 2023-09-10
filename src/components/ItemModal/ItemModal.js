import './ItemModal.css'

const ItemModal = ({ selectedCard, onClose, onDeleteItem }) => {
  const handleDeleteItemSubmit = () => {
    onDeleteItem(selectedCard.id)
  }
  return (
    <div className={'modal'}>
      <div className='modal__container modal__container-image'>
        <button
          type='button'
          onClick={onClose}
          className='modal__close-button-white'
        ></button>
        <img
          src={selectedCard.link}
          alt={selectedCard.name}
          className='modal__image-preview'
        />
        <h3 className='modal__item-name'>{selectedCard.name}</h3>
        <div className='modal__weather-type'>
          Weather type: {selectedCard.weatherType}
        </div>
        <button
          type='button'
          className='modal__delete-button'
          onClick={handleDeleteItemSubmit}
        >
          Delete Item
        </button>
      </div>
    </div>
  )
}

export default ItemModal
