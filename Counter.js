import { useDispatch, useSelector } from "react-redux";
import { increamentAction, decreamentAction } from "./CounterSlice";
import React from 'react'

export default function Counter() {
    const dispatch = useDispatch();
    const value = useSelector(state=>state.counter.value);
    return (
        <div>
            counster:{value}
            <button onClick={() => { dispatch(increamentAction()) }}>increament</button>
            <button onClick={() => { dispatch(decreamentAction()) }}>decreament</button>
        </div>
    )
}