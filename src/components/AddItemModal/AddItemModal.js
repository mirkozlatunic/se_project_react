import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  handleCloseModal,
  handleAddItemSubmit,
  isOpen,
  isLoading,
}) => {
  const [name, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [weather, setWeatherType] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setUrl("");
      setWeatherType("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddItemSubmit({ name, imageUrl, weather });
  };

  const isEnabled =
    name.length > 0 && imageUrl.length > 0 && weather.length > 0;

  return (
    <ModalWithForm
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Saving..." : "Add Garment"}
      isEnabled={isEnabled}
    >
      <div className="modal__text-inputs">
        <label className="modal__label">
          Name
          <input
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            className="modal__input"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
        </label>
        <label className="modal__label">
          Image
          <input
            type="url"
            name="link"
            minLength="1"
            maxLength="999"
            className="modal__input"
            placeholder="Image URL"
            value={imageUrl}
            onChange={handleUrlChange}
          />
        </label>
      </div>
      <p className="modal__select-weather">Select the weather type:</p>
      <div className="modal__radio-inputs">
        <div className="modal__radio-set">
          <label className="modal__radio-button-label">
            <input
              type="radio"
              id="hot"
              value="hot"
              className="modal__radio-button"
              name="radio-button-weather"
              onChange={handleWeatherTypeChange}
            />
            Hot
          </label>
        </div>
        <div className="modal__radio-set">
          <label className="modal__radio-button-label">
            <input
              type="radio"
              id="warm"
              value="warm"
              className="modal__radio-button"
              name="radio-button-weather"
              onChange={handleWeatherTypeChange}
            />
            Warm
          </label>
        </div>
        <div className="modal__radio-set">
          <label className="modal__radio-button-label">
            <input
              type="radio"
              id="cold"
              value="cold"
              className="modal__radio-button"
              name="radio-button-weather"
              onChange={handleWeatherTypeChange}
            />
            Cold
          </label>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
