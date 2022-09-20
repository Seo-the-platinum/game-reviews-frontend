import React, { useState } from 'react'
import Header from './components/header/Header'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Signup from './views/signup/Signup'
import { Route, Routes } from 'react-router-dom'
import './css/app.css'

const App = () => {
  const [ dark, setDark ] = useState(true)
  const handleToggle = ()=> {
    setDark(prev => !prev)
  }
  return (
    <div className={!dark ? 'app' : 'app dark'}>
      <Header dark={dark} handleToggle={handleToggle}/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
    </div>
  );
}

export default App;
