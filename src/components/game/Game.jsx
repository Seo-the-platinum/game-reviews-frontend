import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './css/game.css'

const Game = ({game}) => {
  const dark = useSelector(state=> state.theme.value)
  const navigate = useNavigate()
  const toGameDetails = ()=> {
    navigate('/game-details', {state: {...game}})
  }
  return (
    <div className='gameContainer' onClick={toGameDetails}>
      <div className='gameImageContainer'>
        <img className='gameImage' src={`${game.background_image}`}/>
      </div>
      <div className='gameInfoContainer'>
        <h3 className={dark ? 'darkGameTitle' : 'gameTitle'}>{game.title}</h3>
        <p className={dark ? 'darkGameDescription' : 'gameDescription'}>
          {game.description}
        </p>
      </div>
    </div>
  )
}

export default Game
