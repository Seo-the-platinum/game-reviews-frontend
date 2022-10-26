import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GameTile from '../../components/game/GameTile'
import '../css/views.css'

const Profile = () => {
  const user = useSelector(state=> state.user.value)
  return (
    <div className='views'>
      {user.games.map(game => {
        return <GameTile key={game.id} game={game}/>
      })}
    </div>
  )
}

export default Profile