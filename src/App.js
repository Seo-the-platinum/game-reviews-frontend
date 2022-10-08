import React, { useEffect, useState } from 'react'
import Header from './components/header/Header'
import Home from './views/home/Home'
import Profile from './views/profile/Profile'
import Login from './views/login/Login'
import Signup from './views/signup/Signup'
import GameDetails from './views/gameDetails/GameDetails'
import AddReview from './views/addReview/AddReview'
import Footer from './components/footer/Footer'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toggleTheme } from './features/theme/themeSlice'
import './css/app.css'

const App = () => {
  const [ dark, setDark ] = useState(true)
  const [ games, setGames ] = useState([])
  const dispatch = useDispatch()

  useEffect(()=> {
    const getData = async ()=> {
      const data = await fetch('http://127.0.0.1:5000/graphql', {
        body: JSON.stringify({
          query: `query {
            games {
              background_image
              description
              id
              players {
                user_id
                context
                rating
                id
              }
              title
            }
          }`
        }),
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
      })
      const json = await data.json()
      setGames(json.data.games)
    }
    getData()
  },[])

  const handleToggle = ()=> {
    setDark(prev => !prev)
    dispatch(toggleTheme())
  }

  const width = window.screen.width
  return (
    <div className={!dark ? 'app' : 'app dark'}>
      <Header dark={dark} handleToggle={handleToggle}/>
      <Routes>
        <Route path='/' element={<Home games={games}/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/game-details' element={<GameDetails />} />
        <Route path='/user-profile' element={<Profile />} />
        <Route path='/add-review' element={<AddReview/>}/>
      </Routes>
      { width < 979 && <Footer/> } 
    </div>
  );
}

export default App;
