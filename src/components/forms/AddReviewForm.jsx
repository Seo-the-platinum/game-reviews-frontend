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
    const handleStar = (e)=> {
        setStarsInState(handleStarChange(e.currentTarget.id))
        setRating(e.currentTarget.id)
    }
    const handleSubmit = (e)=> {
        e.preventDefault()
        const context = document.getElementById('textArea').value
        console.log(context, game_id, rating, user.id)
        const post = async ()=> {
            const request = await fetch('http://127.0.0.1:5000/graphql', {
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
            console.log(data)
        }
        post()
    }
    console.log(user)
  return (
    <div className='addReviewFormContainer'>
        <form className='addReviewForm' onSubmit={handleSubmit}>
            <label>Rating:</label>
            <div className="starsContainer">
            { starsInState.map(star=> {
                return (
                <div className="starContainer" id={star.id} onClick={handleStar} key={star.id}>
                    {star.icon}
                </div>)
            })}
            </div>
            <label>Tell us what you thought</label>
            <textarea id='textArea' col='100' rows='5' maxLength='200'></textarea>
            <button className='reviewFormButton' type='submit'> Add Review</button>
        </form>
    </div>
  )
}

export default AddReviewForm