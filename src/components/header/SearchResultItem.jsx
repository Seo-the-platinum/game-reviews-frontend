import React from 'react'
import { useNavigate } from 'react-router-dom'

const SearchResultItem = ({game, setResults, setSearch}) => {
    const navigate = useNavigate()
    const handleRedirect = ()=> {
        setResults([])
        setSearch('')
        navigate('/game-details', {state: {...game}})
    }
  return (
    <div className="searchResultContainer" onClick={handleRedirect}>
        <img className='searchResultImage' src={game.background_image}/>
        <p className='searchResultTitle'>{game?.title ? game.title : game.name}</p>
    </div>
  )
}

export default SearchResultItem