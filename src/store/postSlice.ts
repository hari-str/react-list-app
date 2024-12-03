import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DefaultRootProps, Posts, User } from '../types'
import { AppDispatch } from '.'
import axios from 'axios'
import { API_BASE_URL } from '../config'
import { Status } from '../types/enum'

//initial state
const initialState: DefaultRootProps['posts'] = {
    posts: [],
    users: [],
    filteredData: [],
    searchQuery: '',
    filter: null,
    status: Status.IDLE,
}

//slice
const slice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<Posts[]>) {
            state.posts = action.payload
            state.filteredData = action.payload
            state.status = Status.SUCCEEDED
        },
        setLoading(state) {
            state.status = Status.LOADING
        },
        setFailed(state) {
            state.status = Status.FAILED
        },
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload
            state.filteredData = state.posts.filter(
                (item) => item.title.toLowerCase().includes(action.payload.toLowerCase()) || item.userId.toString().includes(action.payload)
            )
        },
        setFilter: (state, action) => {
            state.filter = action.payload
            state.filteredData = state.posts.filter((item) => action.payload === null || item.userId === action.payload)
        },
        setUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
        },
    },
})

export const { setPosts, setSearchQuery, setFilter } = slice.actions

export default slice.reducer

//Get API for posts
export function getPosts() {
    return async (dispatch: AppDispatch) => {
        dispatch(slice.actions.setLoading())
        try {
            const response = await axios.get(`${API_BASE_URL}/posts`)
            if (response && response.data) dispatch(slice.actions.setPosts(response.data))
        } catch (error) {
            console.error('Failed to fetch posts:', error)
            dispatch(slice.actions.setFailed())
        }
    }
}

//Get API for users
export function getUsers() {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/users`)
            if (response && response.data) dispatch(slice.actions.setUsers(response.data))
        } catch (error) {
            console.error('Failed to fetch posts:', error)
        }
    }
}
