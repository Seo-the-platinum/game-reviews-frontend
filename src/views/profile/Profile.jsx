import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GameTile from '../../components/game/GameTile'
import '../css/views.css'

const Profile = () => {
  const user = useSelector(state=> state.user.value)
  console.log(user.games)
  return (
    <div className='views'>
      <h3>{`Hello, ${user.username}`}</h3>
      {user.games.map(game => {
        return <GameTile game={game}/>
      })}
    </div>
  )
}

export default Profile