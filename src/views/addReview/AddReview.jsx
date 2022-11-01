import React from 'react'
import AddReviewForm from '../../components/forms/AddReviewForm'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import '../css/views.css'
import './addReview.css'

const AddReview = () => {
  const location = useLocation()
  const { id, title, background_image } = location.state
  const dark = useSelector(state=> state.theme.value)
  return (
    <div className='views'>
      <div className="gameToreviewContainer">
        <img className='addReviewImage' src={background_image} alt={`${title} art`}/>
        <h3 className={dark ? 'darkAddReviewTitle' : 'addReviewTitle'}>{title}</h3>
      </div>
      <AddReviewForm game_id={id}/>
    </div>
  )
}

export default AddReview