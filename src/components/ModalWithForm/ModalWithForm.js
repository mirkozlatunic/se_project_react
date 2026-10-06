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
  error,
}) => {
  const submitButtonClass = `modal__submit-button ${
    isEnabled ? "modal__submit-button_enabled" : "modal__submit-button_disabled"
  }`;

  return (
    <div
      className={`modal modal__type_${modalName}`}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Dialog"}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="modal__container">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
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
          {error && (
            <p className="modal__error" role="alert">
              {error}
            </p>
          )}
          {altText && (
            <button
              type="button"
              className="modal__alt-submit-button"
              onClick={altSubmit}
            >
              {altText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;
