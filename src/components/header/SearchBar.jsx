import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search';
import SearchResultItem from './SearchResultItem'
import { addGameRequest } from '../../utils/addGame';
import { useDispatch } from 'react-redux'
import { addGame } from '../../features/games/gamesSlice'
import './css/header.css'

const SearchBar = () => {
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])
  const [focusedIndex, setFocusedIndex ] = useState(-1)
  const resultContainer = useRef(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=> {
    const controller = new AbortController();
    const { signal } = controller;
    if (search.length > 0) {
      const sendRequest = async ()=> {
        try {
          const request = await fetch('https://seos-game-reviews.herokuapp.com/graphql', {
            body: JSON.stringify({
              query: `query {
                  gamesByString(str: "${search}") {
                    title
                    id
                    background_image
                    description
                    players {
                      user_id
                      context
                      rating
                      id
                    }
                }
              }`
            }),
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            signal
          })
          const res = await request.json()
          const { gamesByString } = res.data
          if (!gamesByString.length) {
            try {
              const rawgRequest = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_ID}&search=${search}&page_size=10`, {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
                signal
              })
              const data = await rawgRequest.json()
              const { results } = data
              setResults(results)
            } catch(e) {
              if (!signal.aborted) {
                console.log(e)
              }
            }
          } else {
            setResults(gamesByString)
          }
        } catch(e) {
          if (!signal.aborted) {
            console.log(e)
          }
        }
      }
      sendRequest()
    } else {
      setResults([])
    }
    return ()=> {
      controller.abort()
    }
  },[search])

  useEffect(()=> {
    if (!resultContainer.current) return;

    resultContainer.current.scrollIntoView({
      block: 'center',
    })
  },[focusedIndex])

  const handleKeydown = (e)=> {
    const { key } = e
    let nextIndex = 0;
    
    if (key === 'ArrowDown') {
      nextIndex = (focusedIndex + 1) % results.length
    }

    if (key === 'ArrowUp') {
      nextIndex = (focusedIndex + results.length - 1) % results.length
    }

    if (key === 'Enter') {
      const gameAtIndex = results[focusedIndex]
      gameAtIndex && handleRedirect(gameAtIndex)
    }

    if (key === 'Escape') {
      handleClear()
    }

    setFocusedIndex(nextIndex)
  }

  const handleSearch = (e)=> {
    setSearch(e.target.value)
  }

  const handleClear = ()=> {
    setSearch('')
    setResults([])
  }

  const handleRedirect = async (game)=> {
    if (typeof game.id !== 'string') {
      const addedGame = await addGameRequest(game)
      dispatch(addGame(addedGame))
      handleClear()
      navigate('/game-details', { state: {...addedGame}})
    } else {
      handleClear()
      navigate('/game-details', {state: {...game}})
    }
}

  return (
    <div className='outerSearchBarContainer' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className='searchBarContainer' tabIndex={1} onKeyDown={handleKeydown}>
        <input className='searchBar' onChange={handleSearch} role='input' type='text' value={search}/>
        <SearchIcon sx={{fontSize: '28px', marginRight: '2px'}}/>
        <div className="resultsContainer">
            {results && results.map((game, index) => {
              return (
                <div 
                  key={index} 
                  ref={index === focusedIndex ? resultContainer : null}
                  onClick={()=>handleRedirect(game)}
                  style={{
                    backgroundColor: index === focusedIndex ? `rgba(0,0,0, 0.2)`:
                     'white', width: '100%'
                  }}>
                  <SearchResultItem game={game}/>
                </div>
              )
            })
            }
        </div>
      </div>
    </div>
  )
}

export default SearchBar