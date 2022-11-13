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
                const loginReq = await fetch('https://seos-game-reviews.herokuapp.com/graphql', {
                    body: JSON.stringify({
                        query: `query {
                            userLogin(string: "${loginData.email_or_username}", password: "${loginData.password}") {
                                id
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
                dispatch(updateUser({...json.data.userLogin}))
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
            <label className={dark ? 'darkFormText formFieldLabel': 'forFieldLabel'}>Email / Username</label>
            <input
                className='formFieldInput'
                name='email_or_username'
                {...register('email_or_username')}
                role='emailInput'
                type='text'
            />
        </div>
        <p className='loginErrors'>
            {errors.email_or_username?.message}
        </p>
        <div className='formField'>
            <label className={dark ? 'darkFormText formFieldLabel': 'forFieldLabel'}>Password</label>
            <input
                className='formFieldInput'
                name='password'
                {...register('password')}
                role='password'
                type='password'
            />
        </div>
        <p className='loginErrors'>
            {errors.password?.message}
        </p>
        <button className={dark ? 'dark-login-btn login-btn' : 'login-btn'}  type='submit'>
            Submit
        </button>
    </form>
  )
}

export default LoginForm