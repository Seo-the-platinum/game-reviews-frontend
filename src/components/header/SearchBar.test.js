import { fireEvent } from '@testing-library/react'
import render from '../../utils/renderWrapper'
import SearchBar from './SearchBar'

describe(SearchBar, ()=> {
    test('check if input exists and has a type of text', ()=> {
        const { getByRole } = render(<SearchBar/>)
        const input = getByRole('input')
        expect(input).toBeInTheDocument()
        expect(input.type).toBe('text')
    })

    test('pass text to check if input field workds', ()=> {
        const { getByRole } = render(<SearchBar/>)
        const input = getByRole('input')
        fireEvent.change(input, {target:{value: 'Final Fantasy 7'}})
        expect(input.value).toEqual('Final Fantasy 7')
    })
})