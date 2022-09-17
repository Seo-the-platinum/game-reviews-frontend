import React from 'react'
import SearchBar from './SearchBar'
import Switch from 'react-switch'
import './css/header.css'

const Header = ({dark, handleToggle}) => {

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
    </div>
  )
}

export default Header