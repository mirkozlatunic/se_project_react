import './ItemCard.css'

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className='card__element'>
      <div>
        <img
          src={item.link}
          alt='card-image'
          className='card__image'
          onClick={() => onSelectCard(item)}
        />
      </div>
      <div className='card__name'>{item.name}</div>
    </div>
  )
}

export default ItemCard
