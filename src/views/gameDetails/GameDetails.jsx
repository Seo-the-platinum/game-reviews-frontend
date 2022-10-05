import React from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Review from '../../components/review/Review'
import '../css/views.css'
import './css/gameDetails.css'

const GameDetails = () => {
    const location = useLocation()
    const dark = useSelector(state=> state.theme.value)
    const user = useSelector(state=> state.user.value)
    const { background_image, description, players, title } = location.state
    const addReview = user && players.find(({user_id})=> user_id === user.id)
    const handleAddReview = ()=> {
        console.log('I want  to add a review please!')
    }
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
            <h3 className={dark ? 'darkGameReviewsHeader' : 'gameReviewsHeader'}>
                Reviews
            </h3>
            <div className="addReview">
                {!addReview && <button onClick={handleAddReview}>Did you play it? Add a review!</button>}
            </div>
            { players && players.map(player => {
                return <Review key={player.id} review={player} dark={dark}/>
            })}
        </div>
    </div>
  )
}

export default GameDetails