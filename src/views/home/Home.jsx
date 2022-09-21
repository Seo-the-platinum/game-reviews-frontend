import React from 'react'
import Game from '../../components/game/Game'
import '../css/views.css'

const Home = ({games}) => {
  return (
    <div className='views'>
        <h1>Welcome some user</h1>
        { games && games.map(game => <Game key={game.id} game={game}/>)}
    </div>
  )
}

export default Home