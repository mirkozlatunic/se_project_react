import './Header.css'
import Logo from '../../images/Logo.svg'
import Avatar from '../../images/avatar.svg'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const Header = ({ onCreateModal, weatherLocation }) => {
  const currentDate = new Date().toLocaleString('default', {
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className='header'>
      <div className='header__menu-left'>
        <div>
          <Link to='/'>
            <img src={Logo} alt='logo' />
          </Link>
        </div>
        <div className='header__date-location'>
          {currentDate}, {weatherLocation}
        </div>
      </div>
      <div className='header__logo'>
        <ToggleSwitch />
        <div>
          <button
            type='text'
            onClick={onCreateModal}
            className='header__add-button'
          >
            + Add clothes
          </button>
        </div>
        <Link className='header__name' to='/profile'>
          Mirko Zlatunic
        </Link>
        <div>
          <img src={Avatar} alt='avatar' className='header__avatar' />
        </div>
      </div>
    </header>
  )
}

export default Header
