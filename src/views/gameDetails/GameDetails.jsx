import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Review from '../../components/review/Review'
import '../css/views.css'
import './css/gameDetails.css'

const GameDetails = () => {
    const location = useLocation()
    const dark = useSelector(state=> state.theme.value)
    const user = useSelector(state=> state.user.value)
    const navigate = useNavigate()
    const { background_image, description, players, title, id} = location.state
    const addReview = user && players.find(({user_id})=> user_id === user.id)
    const handleAddReview = ()=> {
        navigate('/add-review', {state: {background_image, description, title, id}})
    }
    console.log(addReview)
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
                {!addReview && user?.id && <button onClick={handleAddReview}>Add a review!</button>}
            </div>
            { players && players.map(player => {
                return <Review key={player.id} review={player} dark={dark}/>
            })}
        </div>
    </div>
  )
}

export default GameDetails