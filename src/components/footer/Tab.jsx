import React from 'react'
import { useNavigate } from 'react-router-dom'

const Tab = ({route}) => {
  const navigate = useNavigate()
  const handleClick = ()=> {
    navigate(route.path)
  }

  return (
    <div onClick={handleClick}>
      {route.icon}
    </div>
  )
}

export default Tab