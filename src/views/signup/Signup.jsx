import React from 'react'
import SignupForm from '../../components/signup/SignupForm'
import { useSelector } from 'react-redux'
import '../css/views.css'
import './css/signup.css'

const Signup = () => {
  const dark = useSelector(state=> state.theme.value)
  return (
    <div className='views' id='signupViews'>
      <SignupForm dark={dark}/>
    </div>
  )
}

export default Signup