import React from 'react'
import Game from '../../components/game/Game'
import { useSelector } from 'react-redux'
import '../css/views.css'

const Home = ({games}) => {
  const user = useSelector(state=> state.user.value)
  const dark = useSelector(state=> state.theme.value)
  return (
    <div className='views'>
        <h1 style={{color: dark ? 'white':'black'}}>{user.username && `Hello ${user.username}`}</h1>
        { games && games.map(game => <Game key={game.id} game={game}/>)}
    </div>
  )
}

export default Home