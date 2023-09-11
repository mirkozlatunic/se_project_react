import React from 'react'
import Avatar from '../../images/avatar.svg'
import './SideBar.css'

const SideBar = () => (
  <div className='sidebar'>
    <img src={Avatar} alt='sidebar__avatar' className='sidebar__avatar' />
    <p className='sidebar__name'>Mirko Zlatunic</p>
  </div>
)

export default SideBar
