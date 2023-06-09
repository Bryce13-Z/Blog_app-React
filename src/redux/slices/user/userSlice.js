import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from '../../../api/auth'


const user = JSON.parse(localStorage.getItem("profile"))

export const register = createAsyncThunk("user/login", async (formData) => {

    try {
        const data = await authService.register(formData)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }

})

export const login = createAsyncThunk("user/login", async (formData) => {

    try {
        const data = await authService.signIn(formData)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }

})

export const updateInfo = createAsyncThunk("user/update", async (formData) => {
    try {
        const data = await authService.updateInfo(formData)
        return data
    } catch(error) {
        console.log(error)
        return error.response.data
    }
})

const initialState = user ? { isLoggedIn: true, authData: user } : {isLoggedIn: false, authData: null}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {  // state.value: {} action.payload: {} 
        SIGNOUT: state => {
            localStorage.clear()
            state.authData = null
        }
    },
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.authData = action.payload.result
        },
        [login.rejected]: (state, action) => {
            state.isLoggedIn = false
            console.log(action.payload)
            state.authData = null
        },
        [register.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.authData = action.payload.result
        },
        [register.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.authData = null
        },
        [updateInfo.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.authData = action.payload.result
        },
        [updateInfo.rejected]: (state, action) => {
            state.isLoggedIn = false
            state.authData = null
        },
        
    }
})

export const { SIGNOUT } = userSlice.actions
export default userSlice.reducer