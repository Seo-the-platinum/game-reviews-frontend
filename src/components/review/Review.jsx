import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './css/review.css'

const Review = ({dark, review}) => {
    const [ username, setUsername ] = useState('')
    const { rating, context, user_id } = review
    //save creating array in notes and review it
    // const starCount = Array.from(Array(rating).keys())
    const starCount = Array.from(Array(5).keys())
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
            const formattedUsername = `${json.data.user.username.slice(0,1).toUpperCase()}${json.data.user.username.slice(1)}`
            setUsername(formattedUsername)
        }
        getUsername()
    },[user_id])
  return (
    <div className='reviewContainer'>
        <div className="usernameAndRating">
            <p className={ dark ? 'darkReviewUsername' : 'reviewUsername'}>{username}</p>
            <div className="starContainer">
                { starCount.map((count, index) => {
                  return index + 1 <= rating ? <StarIcon key={count} sx={{color: 'gold'}} fontSize='small'/> :
                    <StarBorderIcon key={count} sx={{color: 'gold'}} fontSize='small'/>
                })}
            </div>
        </div>
        <div className="reviewContextContainer">
            <p className={dark ? 'darkReviewContext' : 'reviewContext'}>{context}</p>
        </div>
    </div>
  )
}

export default Review