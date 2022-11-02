import React from 'react'
import SearchBar from './SearchBar'
import Switch from 'react-switch'
import LoginAndSignup from './LoginAndSignup'
import Logout from './Logout'
import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../features/theme/themeSlice'
import HeaderAddOn from '../headerAddOn/AdditionalBtns'
import './css/header.css'

const Header = () => {
  const user = useSelector(state=> state.user.value)
  const dark = useSelector(state=> state.theme.value)
  const dispatch =useDispatch()
  const handleToggle = ()=> {
      dispatch(toggleTheme())
    }
  const width = window.screen.width
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
          role='switch'
          uncheckedIcon={false}
        />
        <SearchBar/>
        <div className="btnsContainer">
          {width > 1024 && <HeaderAddOn dark={dark}/>}
          {!user.username ? <LoginAndSignup/> : <Logout/>}
        </div>
    </div>
  )
}

export default Header