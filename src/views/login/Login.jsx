import React from 'react'
import LoginForm from '../../components/login/LoginForm'
import { useSelector } from 'react-redux'
import '../css/views.css'
import './css/login.css'

const Login = () => {
  const dark = useSelector(state=> state.theme.value)
  return (
    <div className="views" id='loginView'>
        <LoginForm dark={dark}/>
    </div>
  )
}

export default Login