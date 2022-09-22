import React from 'react'
import LoginForm from '../../components/login/LoginForm'
import { useSelector } from 'react-redux'
import '../css/views.css'

const Login = () => {
  const dark = useSelector(state=> state.theme.value)
  return (
    <div className="views">
        <LoginForm dark={dark}/>
    </div>
  )
}

export default Login