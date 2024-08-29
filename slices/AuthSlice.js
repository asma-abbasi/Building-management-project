import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { isLoggedIn: true, user } :
    { isLoggedIn: false, user: null }

export const login = createAsyncThunk(
    "auth/login",
    async ({ username, password, enteredCaptchaCode }) => {
        const data = await AuthService.login(username, password, enteredCaptchaCode);
        return { user: data };
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [login.fulfilled]: (state, action) => {
            state.isLoggedIn = true
            state.user = action.payload.user
        }, [login.pending]: state => {
            state.isLoggedIn = false
            state.user = null
        },
        [login.rejected]: state => {
            state.isLoggedIn = false
            state.user = null
        }
    }
})

export default authSlice.reducer;