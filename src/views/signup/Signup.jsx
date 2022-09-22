import React from 'react'
import SignupForm from '../../components/signup/SignupForm'
import { useSelector } from 'react-redux'

const Signup = () => {
  const dark = useSelector(state=> state.theme.value)
  return (
    <div className='views'>
      <SignupForm dark={dark}/>
    </div>
  )
}

export default Signup