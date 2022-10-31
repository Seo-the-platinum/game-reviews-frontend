import { fireEvent, render } from '@testing-library/react'
import store from '../../app/store'
import { Provider } from 'react-redux'
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom'
import LoginAndSignup from './LoginAndSignup'
import Login from '../../views/login/Login'
import Signup from '../../views/signup/Signup'

describe(LoginAndSignup, ()=> {
    test('test navigation from header to login page', async () => {
        const { getByRole } =  render(
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<LoginAndSignup/>}/>
                        <Route path='/login' element={<Login/>}/>
                    </Routes>
                </BrowserRouter>
            </Provider>
        )
        const btns = getByRole('btns')
        const loginBtn = getByRole('login-btn')        
        expect(btns).toBeInTheDocument()
        
        fireEvent.click(loginBtn)
        const loginPage = getByRole('login')
        expect(loginPage).toBeInTheDocument()

    })

    test('test navigation from header to signup page', ()=> {
        const { getByRole } = render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path='/' element={<LoginAndSignup/>}/>
                        <Route path='/signup' element={<Signup/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        )

        const signupBtn = getByRole('signup-btn')
        fireEvent.click(signupBtn)
        const signupPage = getByRole('signup')
        expect(signupPage).toBeInTheDocument()
    })
})