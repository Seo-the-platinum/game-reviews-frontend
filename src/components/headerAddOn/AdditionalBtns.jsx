import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import './AdditionalBtns.css'

const AdditionalBtns = ({dark}) => {
    const navigate = useNavigate()
    const user = useSelector(state => state.user.value)
    const handleClick = (e)=> {
        const id = e.target.dataset.testid
        console.log(id)
        if (id === 'HomeIcon') {
            navigate('/')
        } else if (!user.username){
            navigate('/login')
        } else {
            navigate('/user-profile')
        }
    }
  return (
    <div className={'additionalContainer'}>
        <button name='home' onClick={handleClick}>
            <HomeIcon sx={{fontSize: '40px', color: dark ? 'white' : 'black',}}/>
        </button>
        <button onClick={handleClick} style={{width: '50px', border: 'none', background: 'none'}}>
            <PersonIcon sx={{fontSize: '40px', color: dark ? 'white' : 'black', pointerEvents: 'none'}}/>
        </button>
    </div>
  )
}

export default AdditionalBtns