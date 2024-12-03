import { configureStore } from '@reduxjs/toolkit'
import { useDispatch as useAppDispatch, useSelector as useAppSelector, TypedUseSelectorHook } from 'react-redux'
import postsReducer from './postSlice'

const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

const useDispatch = () => useAppDispatch<AppDispatch>()
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector

export { store, useDispatch, useSelector }
