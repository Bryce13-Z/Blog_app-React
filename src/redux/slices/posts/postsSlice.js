import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from '../../../api/post'

export const getPosts = createAsyncThunk("posts/getPosts", async (page) => {
    try {
        const data = await postService.getPosts(page)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

export const getPostsByUserId = createAsyncThunk("posts/getPostsByUserId", async (page) => {
    try {
        const data = await postService.getPostsByUserId(page)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

export const getPostsByLiked = createAsyncThunk("posts/getPostsByLiked", async (page) => {
    try {
        const data = await postService.getPostsByLiked(page)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

const initialState = { isLoggedIn: false, data: [] }

export const postsSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        deletePostFromPosts(state, action) {
            state.data = state.data.filter((post) => post._id !== action.payload)
        }
    },
    extraReducers: {
        [getPosts.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.data = action.payload.data
        },
        [getPosts.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.data = []
        },
        [getPostsByUserId.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.data = action.payload.data
        },
        [getPostsByUserId.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.data = []
        },
        [getPostsByLiked.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.data = action.payload.data
        },
        [getPostsByLiked.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.data = []
        },
    }
})
export const { deletePostFromPosts } = postsSlice.actions
export default postsSlice.reducer