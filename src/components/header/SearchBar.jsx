import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import SearchResultItem from './SearchResultItem'
import './css/header.css'

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

  const handleSearch = (e)=> {
    setSearch(e.target.value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
  }
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <form className='searchBarContainer'>
          <input className='searchBar' onChange={handleSearch} type='text' value={search}/>
          <button className='searchBarButton' onClick={handleSubmit} type='submit'>
            <SearchIcon sx={{fontSize: '24px'}}/>
          </button>
      </form>
      <div className="resultsContainer">
          {results && results.slice(0, 5).map(game => {
            return (
              <SearchResultItem game={game} setResults={setResults} setSearch={setSearch}/>
            )
          })
          }
        </div>
    </div>
  )
}

export default SearchBar