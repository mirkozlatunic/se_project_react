import './Header.css'
import Logo from '../../images/Logo.svg'
import Avatar from '../../images/avatar.svg'

const Header = ({ onCreateModal }) => {
  const weatherCity = 'Redondo Beach (USA)'
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className='header'>
      <div className='header__menu-left'>
        <div>
          <img src={Logo} alt='logo' />
        </div>
        <div className='header__date-location'>
          {currentDate}, {weatherCity}
        </div>
      </div>
      <div className='header__logo'>
        <div>
          <button
            type='text'
            onClick={onCreateModal}
            className='header__add-button'
          >
            + Add clothes
          </button>
        </div>
        <div className='header__name'>Mirko Zlatunic</div>
        <div>
          <img src={Avatar} alt='avatar' className='header__avatar' />
        </div>
      </div>
    </header>
  )
}

export default Header
