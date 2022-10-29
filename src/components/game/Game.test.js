import Game from './Game'
import render from '../../utils/renderWrapper'

const test_game = {
    description: 'This is a brief description of a test game',
    id: '1',
    background_image: 'https://media.rawg.io/media/games/d89/d89bd0cf4fcdc10820892980cbba0f49.jpg',
    title: 'test_game_title',
}

describe(Game, ()=> {
    it('takes a game object in as a prop and displays data',()=> {   
        const { getByTestId, getByRole } = render(<Game game={test_game} key={test_game.id}/>)
        const imgElement = getByTestId('background')
        const titleElement = getByRole('title').textContent
        const descriptionElement = getByRole('description').textContent
        expect(imgElement).toBeInTheDocument()
        expect(titleElement).toEqual(test_game.title)
        expect(descriptionElement).toEqual(test_game.description)
        expect(imgElement).toHaveAttribute('src', test_game.background_image)
    })
})