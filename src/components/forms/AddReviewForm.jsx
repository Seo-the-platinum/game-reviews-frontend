import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './forms.css'

const AddReviewForm = () => {
    const [ stars, setStars ] = useState(0)
    const handleStar = (e)=> {
        console.log('twinkle twinkle', e.currentTarget.id)
    }
  return (
    <div className='addReviewFormContainer'>
        <form className='addReviewForm'>
          <label>Rating:</label>
          <div className="starsContainer">
            <div className="starContainer" id='1' onClick={handleStar}>
                <StarIcon sx={{color: 'gold'}}/>
            </div>
            <div className="starContainer" id='2' onClick={handleStar}>
                <StarIcon sx={{color: 'gold'}}/>
            </div>
            <div className="starContainer" id='3' onClick={handleStar}>
                <StarIcon sx={{color: 'gold'}}/>
            </div>
            <div className="starContainer" id='4' onClick={handleStar}>
                <StarIcon sx={{color: 'gold'}}/>
            </div>
            <div className="starContainer" id='5' onClick={handleStar}>
                <StarIcon sx={{color: 'gold'}}/>
            </div>
          </div>
          <label>Tell us what you thought</label>
          <textarea col='100' rows='5' maxLength='200'></textarea>
          <button className='reviewFormButton' type='submit'> Add Review</button>
        </form>
    </div>
  )
}

export default AddReviewForm