import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Review from '../../components/review/Review'
import '../css/views.css'
import './css/gameDetails.css'

const GameDetails = () => {
    const location = useLocation()
    const dark = useSelector(state=> state.theme.value)
    const { background_image, description, players, title } = location.state
    
  return (
    <div className='views'>
        <div className="gameDetailsImageContainer">
            <img alt='Game background' className='gameDetailsImage' src={background_image}/>
        </div>
        <div className="gameDetailsInfoContainer">
            <h3 className={dark ? 'darkGameTitle' : 'gameTitle'}>{title}</h3>
            <p className={dark ? 'darkGameDescription' : 'gameDescription'}>{description}</p>
        </div>
        <div className="gameReviews">
            <h3>Reviews</h3>
            { players && players.map(player => {
                return <Review key={player.id} review={player}/>
            })}
        </div>
    </div>
  )
}

export default GameDetails