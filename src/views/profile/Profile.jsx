import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GameTile from '../../components/game/GameTile'
import '../css/views.css'

// const getUsersData = async (user)=> {
//   try {
//     const request = await fetch('https://seos-game-reviews.herokuapp.com/graphql', {
//       body: JSON.stringify({query: `query {
//           user(id: "${user.id}") {
//             games {
//               id
//               rating
//             }
//           }
//         }
//       `}),
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'}
//     })
//     const response = await request.json()
//     console.log(response)
//   } catch(error) {
//     console.log(error)
//   }
// }

const Profile = () => {
  const user = useSelector(state=> state.user.value)

  // useEffect(()=> {
  //   getUsersData(user)
  // })
  
  return (
    <div className='views'>
      {user.games.map(game => {
        return <GameTile key={game.id} game={game}/>
      })}
    </div>
  )
}

export default Profile