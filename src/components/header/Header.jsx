import React from 'react'
import SearchBar from './SearchBar'
import Switch from 'react-switch'
import LoginAndSignup from './LoginAndSignup'
import Logout from './Logout'
import { useSelector } from 'react-redux'
import './css/header.css'

const Header = ({dark, handleToggle}) => {
  const user = useSelector(state=> state.user.value)
  return (
    <div className='headerContainer'>
        <Switch
          checked={dark}
          checkedIcon={false}
          className='react-switch'
          offColor='#011c1d'
          offHandleColor='#ffffff'
          onChange={handleToggle}
          onColor='#ffffff'
          onHandleColor='#011c1d'
          uncheckedIcon={false}
        />
        <SearchBar/>
        {!user.username ? <LoginAndSignup/> : <Logout/>}
    </div>
  )
}

export default Header