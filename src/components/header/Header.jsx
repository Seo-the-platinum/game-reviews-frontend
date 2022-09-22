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
          offColor='#014f4f'
          offHandleColor='#ffffff'
          onChange={handleToggle}
          onColor='#ffffff'
          onHandleColor= '#014f4f'
          uncheckedIcon={false}
        />
        <SearchBar/>
        {!user.username ? <LoginAndSignup/> : <Logout/>}
    </div>
  )
}

export default Header