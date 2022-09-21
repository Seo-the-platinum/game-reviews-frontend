import React from 'react'
import StarIcon from '@mui/icons-material/Star';

const Review = ({review}) => {
    const { rating, context, user_id } = review
    //save in notes
    const starCount = Array.from(Array(rating).keys())

  return (
    <div className='reviewContainer'>
        <div className="usernameAndRating">
            <h3>{user_id}</h3>
            <div className="starContainer">
                { starCount.map(count => {
                    return <StarIcon sx={{color: 'red'}}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default Review