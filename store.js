import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from './CounterSlice'
// import postReducer from "./PostSlice";
import authReducer from './slices/AuthSlice';

const store = configureStore({
    reducer: {
        auth: authReducer
        // counter: counterReducer,
        // posts: postReducer
    }
})

export default store;