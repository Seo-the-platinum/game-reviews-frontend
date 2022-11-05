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
import { useDispatch, useSelector } from 'react-redux'
import { getGames } from './features/games/gamesSlice'
import './css/app.css'

const App = () => {
  const dark = useSelector(state=> state.theme.value)
  const dispatch = useDispatch()
  useEffect(()=> {
    const getData = async ()=> {
      const data = await fetch('https://seos-game-reviews.herokuapp.com/graphql', {
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
      dispatch(getGames(json.data.games))
    }
    getData()
  },[])

  const width = window.screen.width
  return (
    <div className={!dark ? 'app' : 'app dark'} role='app'>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/game-details' element={<GameDetails />} />
        <Route path='/user-profile' element={<Profile />} />
        <Route path='/add-review' element={<AddReview/>}/>
      </Routes>
      { width < 1024 && <Footer/> } 
    </div>
  );
}

export default App;
