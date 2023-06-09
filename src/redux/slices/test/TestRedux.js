import React, {useState} from 'react'
import {useSelector, useDispatch } from 'react-redux'
import {decrement, increment, incrementByAmout } from './testSlice'

const TestRedux = () => {
    const count = useSelector(state => state.test.value)
    const dispatch = useDispatch()

    const [amount, SetAmout] = useState(0)

    return (
        <div>
            <span>{count}</span>
            <div>
                <button
                    arial-label="Increment value"
                    onClick={()=> dispatch(increment())}
                >
                    Increment
                </button>
                <button
                    aria-label='Decrement value'
                    onClick={()=> dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
            <div>
                <span>Increase Amout: </span>
                <input type="number" min="10" max="50" value={amount} onChange={(event)=> SetAmout(event.target.value)}/>
                <button
                    onClick={()=> dispatch(incrementByAmout(amount))}
                >
                   increment By Amout
                </button>
            </div>
        </div>
    )
}

export default TestRedux