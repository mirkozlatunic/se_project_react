import './ModalWithForm.css'

const ModalWithForm = ({
  children,
  buttonText = 'Add garment',
  title,
  onClose,
  modalName,
}) => {
  return (
    <div className={`modal modal__type_${modalName}`}>
      <div className='modal__container'>
        <button
          type='button'
          onClick={onClose}
          className='modal__close-button'
        />
        <h3 className='modal__title'>{title}</h3>
        <form className='modal__form'>
          {children}
          <button type='submit' className='modal__submit-button'>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm
