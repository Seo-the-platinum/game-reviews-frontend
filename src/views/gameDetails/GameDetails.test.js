import GameDetails from './GameDetails'
// import { render } from '@testing-library/react'
import render from '../../utils/renderWrapperHistory'
import { MemoryRouter } from 'react-router-dom'

const test_game = {
    description: 'This is a brief description of a test game',
    id: '1',
    background_image: 'https://media.rawg.io/media/games/d89/d89bd0cf4fcdc10820892980cbba0f49.jpg',
    title: 'test_game_title',
}

describe(GameDetails,()=> {
    it('tests that we get data from route params', ()=> {
        const { getByRole } = render(<MemoryRouter initialEntries={[{pathname:'/', state:{...test_game}},]}><GameDetails/></MemoryRouter>)
        expect(getByRole('background')).toBeTruthy()
    })
})