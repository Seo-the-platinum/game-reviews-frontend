import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import './css/game.css'

const GameTile = ({game}) => {
    const starCount = Array.from(Array(game.rating).keys())
    const [ gameData, setGameData ] = useState()
    useEffect(()=> {
        const getGameData = async ()=> {
            const request = await fetch('http://127.0.0.1:5000/graphql', {
                body: JSON.stringify({
                    query: `query {
                        gameById(id: "${game.game_id}") {
                            background_image
                            title
                        }
                    }`
                }),
                headers: {'content-type': 'application/json'},
                method: 'POST',
            })
            const json = await request.json()
            console.log(json)
            setGameData(json.data.gameById)
        }
        getGameData()
    },[])
  return (
    <div className='gameTileContainer'>
        <img className='gameTileImage' src={gameData?.background_image}/>
        <h3>{gameData?.title}</h3>
        <div className="gameTileReview">
            <p>Your Rating:</p>
            <div className="gameTileStars">
                {starCount.map(star=> <StarIcon key={star} sx={{color: 'red'}} fontSize='small'/>)}
            </div>
        </div>
    </div>
  )
}

export default GameTile