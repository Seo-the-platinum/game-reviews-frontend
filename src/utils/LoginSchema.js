import * as yup from 'yup'

const validateEmail = (email)=> {
    return yup.string().email().isValidSync(email)
}

const validateUsername = (username)=> {
    return yup.string().isValidSync(username)
}

export const schema = yup.object().shape({
    email_or_username: yup.string()
    .required('Email or Username is required')
    .test('email_or_username', 'Email or Username is invalid', (value)=> {
        return validateEmail(value) ||  validateUsername(value)
    }),
    password: yup.string().required()
})

