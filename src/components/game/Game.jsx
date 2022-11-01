import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './css/game.css'

const Game = ({game, inverted}) => {
  const dark = useSelector(state=> state.theme.value)
  const navigate = useNavigate()
  const toGameDetails = ()=> {
    navigate('/game-details', {state: {...game}})
  }
  
  return (
    <div className={inverted ? 'gameContainerInverted gameContainer' : 'gameContainer'} onClick={toGameDetails}>
      <div className='gameImageContainer'>
        <img alt='Game background' className='gameImage' data-testid={'background'} src={`${game.background_image}`}/>
      </div>
      <div className='gameInfoContainer'>
        <h3 className={dark ? 'darkGameTitle' : 'gameTitle'} role='title'>{game.title}</h3>
        <div className="descriptionContainer">
          <p className={dark ? 'gameDescription darkGameDescription' : 'gameDescription'} role='description'>
            {game.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Game
