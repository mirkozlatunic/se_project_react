import React from "react";
import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

const Profile = ({
  onCreateModal,
  clothingItems,
  onSelectCard,
  handleLogOut,
  handleEditProfileModal,
  loggedIn,
}) => {
  return (
    <section className="profile">
      <div className="profile__sidebar">
        <SideBar
          handleLogOut={handleLogOut}
          handleEditProfileModal={handleEditProfileModal}
        />
      </div>
      <div>
        <ClothesSection
          onCreateModal={onCreateModal}
          cards={clothingItems}
          onSelectCard={onSelectCard}
          loggedIn={loggedIn}
        />
      </div>
    </section>
  );
};

export default Profile;
