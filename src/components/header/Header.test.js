// import { render } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import render from '../../utils/renderWrapper'
import Header from './Header'

describe(Header, ()=> {
    test('when switch is clicked, toggles between true and false values', ()=> {
        const {getByRole} = render(<Header/>)
        let switchElement = getByRole('switch')
        fireEvent.change(switchElement, {target: {checked: false}})
        expect(switchElement.checked).toBe(false)
        switchElement = getByRole('switch')
        fireEvent.change(switchElement, {target: {checked: true}})
        expect(switchElement.checked).toBe(true)
    })
})