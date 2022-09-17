import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from '../../utils/LoginSchema'
import './css/login.css'

const LoginForm = () => {
    const { register, handleSubmit, formState:{errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const handleFormSubmit = (data)=> {
        console.log(data)
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
        <button type='submit'>
            submit
        </button>
    </form>
  )
}

export default LoginForm