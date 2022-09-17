import React, { useState } from 'react'
import Login from './views/login/Login'
import Header from './components/header/Header'
import './css/app.css'

const App = () => {
  const [ dark, setDark ] = useState(true)
  const handleToggle = ()=> {
    setDark(prev => !prev)
  }
  return (
    <div className={!dark ? 'app' : 'app dark'}>
      <Header dark={dark} handleToggle={handleToggle}/>
      <Login/>
    </div>
  );
}

export default App;
