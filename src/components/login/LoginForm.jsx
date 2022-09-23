import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../utils/LoginSchema'
import { useDispatch } from 'react-redux'
import { updateUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'
import './css/login.css'

const LoginForm = ({dark}) => {
    const [ loginData, setLoginData ] = useState()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })
    useEffect(()=> {
        if (loginData) {
            const loginUser = async ()=> {
                const loginReq = await fetch('http://127.0.0.1:5000/graphql', {
                    body: JSON.stringify({
                        query: `query {
                            userLogin(string: "${loginData.email_or_username}", password: "${loginData.password}") {
                                email
                                games {
                                    context
                                    id
                                    game_id
                                    rating
                                }
                                username
                            }
                        }`
                    }),
                    method: 'POST',
                    headers: { 'content-type': 'application/json'}
                })
                const json = await loginReq.json()
                dispatch(updateUser(json.data.userLogin))
                navigate('/')
            }
            loginUser()
        } 
    },[loginData])

    const handleFormSubmit = (data)=> {
        setLoginData({...data})
    }
  return (
    <form className='loginForm' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='formField'>
            <label className='formFieldLabel'>Email or Username</label>
            <input
                className='formFieldInput'
                name='email_or_username'
                {...register('email_or_username')}
                type='text'
            />
        </div>
        <p className='loginErrors'>
            {errors.email_or_username?.message}
        </p>
        <div className='formField'>
            <label className='formFieldLabel'>Password</label>
            <input
                className='formFieldInput'
                name='password'
                {...register('password')}
                type='password'
            />
        </div>
        <p className='loginErrors'>
            {errors.password?.message}
        </p>
        <button className='login-btn' id={dark ? 'dark-login-btn' : ''} type='submit'>
            submit
        </button>
    </form>
  )
}

export default LoginForm