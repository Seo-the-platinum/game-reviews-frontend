import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://seos-game-reviews.herokuapp.com/graphql'
})
