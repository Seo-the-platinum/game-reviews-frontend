import { createSlice } from '@reduxjs/toolkit'

export const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        value: []
    },
    reducers: {
        getGames: (state, action)=> {
            state.value = [...action.payload]
        },

        addGame: (state, action)=> {
            console.log(action.payload)
            state.value = [...state.value, action.payload]
        }
    }
})

export const { getGames, addGame } = gamesSlice.actions
export default gamesSlice.reducer