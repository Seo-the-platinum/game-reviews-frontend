import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './css/header.css'

const rawg_fetch = async (search, signal)=> {
  try {
    const request = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_ID}&search=${search}&page_size=10`, {
      method: 'GET',
      headers: { 'content-type': 'application/json'},
      signal
    })
    const data = await request.json()
    const { results } = data
    console.log(results)
  } catch(e) {
    if (!signal.aborted) {
      console.log(e)
    }
  }
}

const sendSearch = async (search, signal)=> {
  try {
    const request = await fetch('http://127.0.0.1:5000/graphql', {
      body: JSON.stringify({
        query: `query {
            gamesByString(str: "${search}") {
              title
              id
              background_image
          }
        }`
      }),
      method: 'POST',
      headers: { 'content-type': 'application/json'},
      signal
    })
    const data = await request.json()
    const { gamesByString } = data.data
    console.log(gamesByString)
    if (!gamesByString.length) {
      return rawg_fetch(search, signal)
    }
  } catch (e) {
    if (!signal.aborted) {
      console.log(e)
    }
  }
}

const SearchBar = () => {
  const [ search, setSearch ] = useState('')
  const [ results, setResults ] = useState([])

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

  const handleSearch = (e)=> {
    setSearch(e.target.value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
  }

  console.log(results)
  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <form className='searchBarContainer'>
          <input className='searchBar' onChange={handleSearch} type='text'/>
          <button className='searchBarButton' onClick={handleSubmit} type='submit'>
            <SearchIcon sx={{fontSize: '24px'}}/>
          </button>
      </form>
      <div className="resultsContainer">
          {results && results.map(game=> {
            return (
              <div className="searchResultContainer">
                <img style={{width: '100%'}} src={game.background_image}/>
                <p>{game.title}</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default SearchBar