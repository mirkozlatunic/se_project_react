import React from 'react'
import './Profile.css'
import SideBar from '../SideBar/SideBar'
import ClothesSection from '../ClothesSection/ClothesSection'

const Profile = ({ onCreateModal, clothingItems, onSelectCard }) => {
  return (
    <section className='profile'>
      <div className='profile__sidebar'>
        <SideBar />
      </div>
      <div>
        <ClothesSection
          onCreateModal={onCreateModal}
          clothingItems={clothingItems}
          onSelectCard={onSelectCard}
        />
      </div>
    </section>
  )
}

export default Profile
