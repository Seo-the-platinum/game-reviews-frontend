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
        const id = e.target.name
        console.log(id)
        if (id === 'home') {
            navigate('/')
        } else if (!user.username){
            navigate('/login')
        } else {
            navigate('/user-profile')
        }
    }
  return (
    <div className={'additionalContainer'}>
        <IconButton 
            name='home' 
            onClick={handleClick}>
            <HomeIcon sx={{color: dark ? 'white': 'black', fontSize: '40px'}}/>
        </IconButton>
        <IconButton
            name='person'
            onClick={handleClick}>
            <PersonIcon sx={{fontSize: '40px', color: dark ? 'white' : 'black',}}/>
        </IconButton>
    </div>
  )
}

export default AdditionalBtns