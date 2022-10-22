import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SearchResultItem from './SearchResultItem'
import './css/header.css'

const SearchBar = () => {
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])
  const [focusedIndex, setFocusedIndex ] = useState(-1)
  const resultContainer = useRef(null)

  useEffect(()=> {
    const controller = new AbortController();
    const { signal } = controller;
    if (search.length > 0) {
      const sendRequest = async ()=> {
        try {
          const request = await fetch('http://127.0.0.1:5000/graphql', {
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

    setFocusedIndex(nextIndex)
  }

  const handleSearch = (e)=> {
    setSearch(e.target.value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div className='searchBarContainer' tabIndex={1} onKeyDown={handleKeydown}>
        <input className='searchBar' onChange={handleSearch} type='text' value={search}/>
        <SearchIcon sx={{fontSize: '28px', marginRight: '2px'}}/>
        <div className="resultsContainer">
            {results && results.map((game, index) => {
              return (
                <div key={index} ref={index === focusedIndex ? resultContainer : null} style={{backgroundColor: index === focusedIndex ? 'black': 'white', width: '100%'}}>
                  <SearchResultItem game={game} setResults={setResults} setSearch={setSearch} />
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