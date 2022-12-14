import React, { useEffect } from 'react'
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
    const { background_image, name, description, players, title, id} = location.state
    const addReview = user?.id && players?.find(({user_id})=> user_id === user.id)
    const handleAddReview = ()=> {
        navigate('/add-review', {state: {background_image, description, title, id}})
    }

    useEffect(()=> {
        window.scrollTo(0,0)
    },[])
    
  return (
    <div className='views' id='gameDetailsContainer'>
        <div className="gameDetailsImageContainer">
            <img alt='Game background' className='gameDetailsImage' role='background' src={background_image}/>
        </div>
        <div className="gameDetailsInfoContainer">
            <h3 className={dark ? 'darkGameTitle' : 'gameTitle'}>{title ? title : name}</h3>
            <div className="gameDetailsDescriptionContainer">
                <p className={
                    dark ? 'gameDetailsDescriptionDark gameDetailsDescription' :
                    'gameDetailsDescription'}
                >
                    {description}
                </p>
            </div>
        </div>
        <div className="gameReviews">
            <h3 className={dark ? 'darkGameReviewsHeader' : 'gameReviewsHeader'}>
                Reviews
            </h3>
            <div className="addReview">
                {!addReview && user?.id && <button className={dark ? 'darkReviewButton' : 
                'reviewButton'} onClick={handleAddReview}>Add a review</button>}
            </div>
            { players && players.map(player => {
                return <Review key={player.id} review={player} dark={dark}/>
            })}
        </div>
    </div>
  )
}

export default GameDetails