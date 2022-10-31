import render from '../../utils/renderWrapper'
import LoginForm from './LoginForm'
import { fireEvent } from '@testing-library/react'

describe(LoginForm, ()=> {
    test('check email input reflects changes', ()=> {
        const { getByRole } = render(<LoginForm/>)
        const input = getByRole('emailInput')
        fireEvent.change(input, {target: {value: 'testing@test.com'}})
        expect(input.value).toBe('testing@test.com')
    })

    test('check password input reflects change and type is email', ()=> {
        const { getByRole } = render(<LoginForm/>)
        const input = getByRole('password')
        fireEvent.change(input, {target: {value: 'mysecretpassword'}})
        expect(input.type).toBe('password')
        expect(input.value).toBe('mysecretpassword')
    })
})