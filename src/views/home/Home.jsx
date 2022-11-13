import React from 'react'
import Game from '../../components/game/Game'
import { useSelector } from 'react-redux'
import '../css/views.css'

const Home = () => {
  const user = useSelector(state=> state.user.value)
  const dark = useSelector(state=> state.theme.value)
  const games = useSelector(state=> state.games.value)
  return (
    <div className='views'>
        { user.username && <h1 style={{color: dark ? 'white':'black'}}>{user.username && `Hello ${user.username}`}</h1>}
        { games && games.map((game, index) => <Game key={game.id} game={game} inverted={index % 2 === 0}/>)}
    </div>
  )
}

export default Home