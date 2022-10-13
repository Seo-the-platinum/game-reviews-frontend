import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './css/header.css'

const SearchBar = () => {
  const [ search, setSearch ] = useState('')
  const handleSearch = (e)=> {
    setSearch(e.target.value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    const sendSearch = async ()=> {
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
        headers: { 'content-type': 'application/json'}
      })
      const data = await request.json()
      console.log(data)
    }
    sendSearch()
  }

  return (
    <form className='searchBarContainer'>
        <input className='searchBar' onChange={handleSearch} type='text'/>
        <button className='searchBarButton' onClick={handleSubmit} type='submit'>
          <SearchIcon sx={{fontSize: '24px'}}/>
        </button>
    </form>
  )
}

export default SearchBar