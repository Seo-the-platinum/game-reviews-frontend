import React, { useState } from 'react'
import { handleStarChange, stars } from '../../utils/starsLogic'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './forms.css'

const AddReviewForm = ({game_id}) => {
    const [ starsInState, setStarsInState ] = useState(stars)
    const [ rating, setRating ] = useState(1)
    const navigate = useNavigate()
    const user = useSelector(state=> state.user.value)
    const dark = useSelector(state=> state.theme.value)
    const handleStar = (e)=> {
        setStarsInState(handleStarChange(e.currentTarget.id))
        setRating(e.currentTarget.id)
    }
    const handleSubmit = (e)=> {
        e.preventDefault()
        const context = document.getElementById('textArea').value
        const post = async ()=> {
            const request = await fetch('https://seos-game-reviews.herokuapp.com/graphql', {
                body: JSON.stringify({
                    query: `mutation {
                        addReview(
                            context: "${context}",
                            game_id: "${game_id}",
                            rating: ${rating},
                            user_id: "${user.id}"
                        ) {
                            context
                        }
                    }`
                }),
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                  },
            })
            const data = await request.json()
            navigate('/')
        }
        post()
    }
  return (
    <div className='addReviewFormContainer'>
        <form className='addReviewForm' onSubmit={handleSubmit}>
            <label className={dark ? 'darkAddReviewFormLabel' : 'addReviewFormLabel'}>Rating:</label>
            <div className="starsContainer">
            { starsInState.map(star=> {
                return (
                <div className="starContainer" id={star.id} onClick={handleStar} key={star.id}>
                    {star.icon}
                </div>)
            })}
            </div>
            <label className={dark ? 'darkAddReviewFormLabel' : 'addReviewFormLabel'}>Tell us what you thought</label>
            <textarea id='textArea' col='100' rows='5' maxLength='200'></textarea>
            <button className={dark ? 'darkReviewFormButton reviewFormButton':'reviewFormButton'} type='submit'> Add Review</button>
        </form>
    </div>
  )
}

export default AddReviewForm