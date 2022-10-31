import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginAndSignup = () => {
    const navigate = useNavigate()
    const dark = useSelector(state => state.theme.value)
    const handleLogin = ()=> {
        navigate('/login')
    }

    const handleSignup = ()=> {
        navigate('/signup')
    }

  return (
    <div className='loginAndSignups' role='btns'>
        <button className='header-btns' id={dark ? 'dark-login-btn' : 'login-btn'} onClick={handleLogin} role='login-btn'>Login</button>
        <button className='header-btns' id={dark ? 'dark-header-signup-btn' : 'header-signup-btn'} role='signup-btn' onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default LoginAndSignup