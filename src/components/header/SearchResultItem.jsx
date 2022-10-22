import React from 'react'

const SearchResultItem = ({game}) => {
  return (
    <div className="searchResultContainer" >
        <img className='searchResultImage' src={game.background_image}/>
        <p className='searchResultTitle'>{game?.title ? game.title : game.name}</p>
    </div>
  )
}

export default SearchResultItem