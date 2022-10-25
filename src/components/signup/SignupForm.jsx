import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../utils/SignupSchema'
import './css/signup.css'

const SignupForm = ({dark}) => {
    const [ signupData, setSignupData ] = useState()
    const navigate = useNavigate()
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })
    const addUser = ()=> {
        const addUserReq = async ()=> {
            const request = await fetch('http://127.0.0.1:5000/graphql', {
                body: JSON.stringify({
                    query: `mutation {
                        addUser(
                            email: "${signupData.email}",
                            password: "${signupData.password}",
                            username: "${signupData.username}"
                            ) {
                                username
                            }
                    }`
                }),
                method: 'POST',
                headers: { 'content-type': 'application/json'}
            })
            const json = await request.json()
        }
        addUserReq()
    }

    const handleFormSubmit = (data)=> {
        setSignupData({...data})
        if (data.password === data.confirm) {
            addUser()
            navigate('/')
        } else {
            return
        }
    }
    
  return (
    <form className='signupForm' onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="formField">
            <label className={dark ? 'darkFormText formFieldLabel': 'formFieldLabel'}>Email</label>
            <input
                className='formFieldInput'
                name="email"
                {...register('email')}
                type="email"
            />
            <p className='signupErrors'>{errors.email?.message}</p>
        </div>
        <div className="formField">
            <label className={dark ? 'darkFormText formFieldLabel': 'formFieldLabel'}>Username</label>
            <input 
                className='formFieldInput'
                name='username'
                {...register('username')}
                type='text'
            /> 
            <p className='signupErrors'>{errors.username?.message}</p>
        </div>
        <div className="formField">
            <label className={dark ? 'darkFormText formFieldLabel': 'formFieldLabel'}>Password</label>
            <input 
                className='formFieldInput'
                name='password'
                {...register('password')}
                type='password' 
            />
            <p className='signupErrors'>{errors.password?.message}</p>
        </div>
        <div className="formField">
            <label className={dark ? 'darkFormText formFieldLabel': 'formFieldLabel'}>Confirm Password</label>
            <input
                className='formFieldInput'
                name='confirm'
                {...register('confirm')}
                type='password' 
            />
            <p className='signupErrors'>{errors.confirm?.message}</p>
        </div>
        <button className='signup-btn' id={dark ? 'dark-signup-btn' : ''} type='submit'>Signup</button>
    </form>
  )
}

export default SignupForm