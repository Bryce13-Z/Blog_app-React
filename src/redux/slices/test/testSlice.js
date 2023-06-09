import {createSlice} from '@reduxjs/toolkit'

export const testSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        decrement: state => {
            state.value -= 1 
        },
        incrementByAmout: (state, action) => {
            state.value += parseInt(action.payload)
        }
    }
})

export const {increment, decrement, incrementByAmout } = testSlice.actions
export default testSlice.reducer 

