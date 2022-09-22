import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import './css/header.css'

const Logout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const dark = useSelector(state=> state.theme.value)
    const handleLogout = ()=> {
        dispatch(updateUser({}))
        navigate('/')
    }

  return (
    <div>
        <button 
            className='header-btns' 
            id={dark ? 'dark-logout-btn' : 'logout-btn'} 
            onClick={handleLogout}>
                Logout
        </button>
    </div>
  )
}

export default Logout