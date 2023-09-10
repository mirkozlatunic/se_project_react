import React from 'react'
import './ClothesSection.css'
import ItemCard from '../ItemCard/ItemCard'

const ClothesSection = ({ onCreateModal, onSelectCard, clothingItems }) => {
  return (
    <div className='clothes__section'>
      <div className='clothes__section-title-wrapper'>
        <p className='clothes__section-title'>Your items:</p>
        <button
          type='submit'
          className='clothes__section-button'
          onClick={onCreateModal}
        >
          + Add new
        </button>
      </div>
      <div className='clothing__section-cards'>
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item?._id ?? item?.id}
              item={item}
              onSelectCard={onSelectCard}
            />
          )
        })}
      </div>
    </div>
  )
}

export default ClothesSection
