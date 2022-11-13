import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../utils/SignupSchema'
import './css/signup.css'

const SignupForm = ({dark}) => {
    const navigate = useNavigate()
    const [ existing, setExisting ] = useState(false)
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })
    const addUser = (data)=> {
        const addUserReq = async ()=> {
            try {
                const emailExists = await fetch('https://seos-game-reviews.herokuapp.com/graphql', {
                    body: JSON.stringify({
                        query: `query {
                            users {
                                email
                                username
                            }
                        }`
                    }),
                    method: 'POST',
                    headers: { 'content-type': 'application/json'}
                })

                const emailJson = await emailExists.json()
                if (!emailJson.data.users.find(user=> user.email === data.email || user.username === data.username)) {
                    const request = await fetch('https://seos-game-reviews.herokuapp.com/graphql', {
                        body: JSON.stringify({
                            query: `mutation {
                                addUser(
                                    email: "${data.email}",
                                    password: "${data.password}",
                                    username: "${data.username}"
                                    ) {
                                        username
                                    }
                            }`
                        }),
                        method: 'POST',
                        headers: { 'content-type': 'application/json'}
                    })
                    const json = await request.json()
                    navigate('/')
                } else {
                    setExisting(true)
                }
            } catch {
                console.log('something wrong')
            }
        }
        addUserReq()
    }

    const handleFormSubmit = (data)=> {
        if (data.password === data.confirm) {
            addUser(data)
        } else {
            return
        }
    }
    
  return (
    <form className='signupForm' onSubmit={handleSubmit(handleFormSubmit)}>
        {existing && <p style={{color: 'red'}}>The email or username you provided is already registered with an account</p>}
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
        <button className={dark ? 'signup-btn dark-signup-btn' : 'signup-btn'} type='submit'>Signup</button>
    </form>
  )
}

export default SignupForm