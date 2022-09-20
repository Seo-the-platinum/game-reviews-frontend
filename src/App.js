import React, { useState } from 'react'
import Header from './components/header/Header'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Signup from './views/signup/Signup'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleTheme } from './features/theme/themeSlice'
import './css/app.css'

const App = () => {
  const [ dark, setDark ] = useState(true)
  const dispatch = useDispatch()
  const handleToggle = ()=> {
    setDark(prev => !prev)
    dispatch(toggleTheme())
  }
  const width = window.screen.width

  return (
    <div className={!dark ? 'app' : 'app dark'}>
      <Header dark={dark} handleToggle={handleToggle}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
      { width < 979 && <Footer/> } 
    </div>
  );
}

export default App;
