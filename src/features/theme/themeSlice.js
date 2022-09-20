import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        value: true
    },
    reducers: {
        toggleTheme: (state)=> {
            return {
                ...state,
                value: !state.value
            }
        }
    }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer