import React from 'react'
import { redirect, useNavigate } from 'react-router-dom'

const LoginAndSignup = () => {
    const navigate = useNavigate()
    const handleLogin = ()=> {
        navigate('/login')
    }

    const handleSignup = ()=> {
        navigate('/signup')
    }
  return (
    <div className='loginAndSignups'>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleSignup}>Signup</button>
    </div>
  )
}

export default LoginAndSignup