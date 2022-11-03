export const addGameRequest = async (game)=> {
    if (typeof game.id !== 'string') {
      try {
        const getDetails = await fetch(`https://api.rawg.io/api/games/${game.id}?key=${process.env.REACT_APP_RAWG_ID}`, {
          headers: {
            'Content-Type': 'application/json'},
          method: 'GET'
        })
        const gameData = await getDetails.json()
        const request = await fetch('https://seos-game-reviews.herokuapp.com/graphql', {
          body: JSON.stringify({
            query: 
              `mutation {
                addGame(
                  background_image: "${gameData.background_image}",
                  description: """${gameData.description_raw}""",
                  rawg_id: ${game.id},
                  released: "${gameData.released}",
                  title: "${gameData.name}"
                ) {
                  id
                  title
                  description
                  background_image
                }
              }`
          }), 
          headers: { 'content-type': 'application/json'},
          method: 'POST',
        })
        const res = await request.json()
        const { background_image, description, id, title } =  res.data.addGame
        return {
          background_image,
          description,
          id,
          title
        }
      } catch(e) {
        console.log(e)
      }
    }
  }