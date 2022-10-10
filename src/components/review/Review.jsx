import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import './css/review.css'

const Review = ({dark, review}) => {
    const [ username, setUsername ] = useState('')
    const { rating, context, user_id } = review
    //save creating array in notes and review it
    const starCount = Array.from(Array(rating).keys())
    useEffect(()=> {
        const getUsername = async ()=> {
            const data = await fetch('http://127.0.0.1:5000/graphql', {
                body: JSON.stringify({
                    query: `query {
                        user(id:"${user_id}") {
                        username
                    }
                }`}),
                method: 'POST',
                headers: {
                    'content-Type': 'application/json',
                  },
            })
            const json = await data.json()
            setUsername(json.data.user.username)
        }
        getUsername()
    },[user_id])

  return (
    <div className='reviewContainer'>
        <div className="usernameAndRating">
            <p className={ dark ? 'darkReviewUsername' : 'reviewUsername'}>{username}</p>
            <div className="starContainer">
                { starCount.map(count => {
                    return <StarIcon key={count} sx={{color: 'gold'}} fontSize='small'/>
                })}
            </div>
        </div>
        <div className="reviewContext">
            <p className={dark ? 'darkReviewContext' : 'reviewContext'}>{context}</p>
        </div>
    </div>
  )
}

export default Review