import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Tab = ({route}) => {
  const navigate = useNavigate()
  const { icon } = route
  const user = useSelector(state=> state.user.value)
  const dark = useSelector(state=> state.theme.value)
  const handleClick = ()=> {
    if (!user.username && route.name === 'profile') {
      navigate('/login')
    } else {
      navigate(route.path)
    }
  }

  return (
    <div onClick={handleClick}>
      {icon(dark)}
    </div>
  )
}

export default Tab