import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import postService from '../../../api/post'

export const createPost = createAsyncThunk("post/createPost", async (formData) => {

    try {
        const data = await postService.createPost(formData)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }

})

export const getPost = createAsyncThunk("post/getPost", async(id) => {
    try {
        const data = await postService.getPost(id)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

export const getPostByEditReq = createAsyncThunk("post/getPostByEditReq", async(id) => {
    try {
        const data = await postService.getPostByEditReq(id)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

export const updatePost = createAsyncThunk("post/updatePost", async(formData, id) => {
    try {
        const data = await postService.updatePost(formData, id)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

export const deletePost = createAsyncThunk("post/deletePost", async(id) => {
    try {
        const data = await postService.deletePost(id)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

export const likePost = createAsyncThunk("post/likePost", async(id) => {
    try {
        const data = await postService.likePost(id)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

export const commentPost = createAsyncThunk("post/commentPost", async(id) => {
    try {
        const data = await postService.commentPost(id)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})



const initialState = { isLoggedIn: false, postData: null }

export const postSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: {
        [createPost.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.postData = action.payload.data
        },
        [createPost.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.postData = null
        },
        [getPost.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.postData = action.payload.data
        },
        [getPost.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.postData = null
        },
        [getPostByEditReq.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.postData = action.payload.data
        },
        [getPostByEditReq.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.postData = null
        },
        [updatePost.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.postData = action.payload.data
        },
        [updatePost.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.postData = null
        },
        [deletePost.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.postData = null
        },
        [deletePost.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.postData = null
        },
        [likePost.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.postData = null
        },
        [likePost.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.postData = null
        },
        [commentPost.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.postData = null
        },
        [commentPost.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.postData = null
        },
    }
})

export default postSlice.reducer