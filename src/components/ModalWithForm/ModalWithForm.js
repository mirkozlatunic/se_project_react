import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText = "Add garment",
  title,
  onClose,
  modalName,
  altText,
  isOpen,
  onSubmit,
  altSubmit,
  isEnabled,
}) => {
  const submitButtonClass = `modal__submit-button ${
    isEnabled ? "modal__submit-button_enabled" : "modal__submit-button_disabled"
  }`;

  return (
    <div className={`modal modal__type_${modalName}`}>
      <div className="modal__container">
        <button
          type="button"
          onClick={onClose}
          className="modal__close-button"
        />
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button
            type="submit"
            className={submitButtonClass}
            disabled={!isEnabled}
          >
            {buttonText}
          </button>
          <button className="modal__alt-submit-button" onClick={altSubmit}>
            {altText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
