import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import themeReducer from '../features/theme/themeSlice'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'


const persistConfig = {
    key: 'user',
    version: 1,
    storage
  }

const persistedReducer = persistReducer(persistConfig, userReducer)
export default configureStore({
    reducer: {
        user: persistedReducer,
        theme: themeReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})