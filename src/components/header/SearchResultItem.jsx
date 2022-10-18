import React from 'react'
import { useNavigate } from 'react-router-dom'

const sendRequest = async (game)=> {
  if (typeof game.id !== 'string') {
    try {
      const getDetails = await fetch(`https://api.rawg.io/api/games/${game.id}?key=${process.env.REACT_APP_RAWG_ID}`, {
        headers: {
          'Content-Type': 'application/json'},
        method: 'GET'
      })
      const gameData = await getDetails.json()
      const request = await fetch('http://127.0.0.1:5000/graphql', {
        body: JSON.stringify({
          query: 
            `mutation {
              addGame(
                background_image: "${gameData.background_image}",
                description: """${gameData.description_raw}""",
                rawg_id: ${game.id},
                released: "${gameData.released}",
                title: "${gameData.name}"
              ) {
                id
                title
                description
                background_image
              }
            }`
        }), 
        headers: { 'content-type': 'application/json'},
        method: 'POST',
      })
      const res = await request.json()
      const { background_image, description, id, title } =  res
      return {
        background_image,
        description,
        id,
        title,
      }
    } catch(e) {
      console.log(e)
    }
  }
}
const SearchResultItem = ({game, setResults, setSearch}) => {
    const navigate = useNavigate()
    const handleRedirect = async ()=> {
        if (typeof game.id !== 'string') {
          const addedGame = sendRequest(game)
          setResults([])
          setSearch('')
          navigate('/game-details', { state: {...addedGame}})
        } else {
          setResults([])
          setSearch('')
          navigate('/game-details', {state: {...game}})
        }
    }
  return (
    <div className="searchResultContainer" onClick={handleRedirect}>
        <img className='searchResultImage' src={game.background_image}/>
        <p className='searchResultTitle'>{game?.title ? game.title : game.name}</p>
    </div>
  )
}

export default SearchResultItem