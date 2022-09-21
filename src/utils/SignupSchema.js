import * as yup from 'yup'

export const schema = yup.object().shape({
    email: yup.string().email().required(),
    username: yup.string().min(6).max(15).required(),
    password: yup.string().min(8).max(15).required(),
    confirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
})