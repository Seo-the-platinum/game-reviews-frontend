import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './css/game.css'

const GameTile = ({game}) => {
    const starCount = Array.from(Array(5).keys())
    const dark = useSelector(state=> state.theme.value)
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
            setGameData(json.data.gameById)
        }
        getGameData()
    },[])
  return (
    <div className='gameTileContainer'>
        <img className='gameTileImage' src={gameData?.background_image}/>
        <h3 style={{color: dark ? 'white' : 'black'}}>{gameData?.title}</h3>
        <div className="gameTileReview">
            <p style={{color: dark ? 'white': 'black'}}>Your Rating:</p>
            <div className="gameTileStars">
                {
                    starCount.map((star, index)=> index <= game.rating ? <StarIcon key={star} sx={{color: 'gold'}} fontSize='small'/> :
                        <StarBorderIcon key={star} sx={{color: 'gold'}} fontSize='small'/>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default GameTile