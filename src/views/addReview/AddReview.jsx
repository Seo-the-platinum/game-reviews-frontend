import React from 'react'
import AddReviewForm from '../../components/forms/AddReviewForm'
import { useLocation } from 'react-router-dom'
import '../css/views.css'
import './addReview.css'

const AddReview = () => {
  const location = useLocation()
  const { id, title, description, background_image } = location.state
  return (
    <div className='views'>
      <div className="gameToreviewContainer">
        <img className='addReviewImage' src={background_image} alt={`${title} art`}/>
        <h3>{title}</h3>
      </div>
      <AddReviewForm game_id={id}/>
    </div>
  )
}

export default AddReview