import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return data;
})

const initialState = {
    postList: [],
    fetchingPosts: false,
    errorMessage: ''
};

const PostSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.postList = action.payload
            state.fetchingPosts = false
        },
        [fetchPosts.response]: state => {
            state.fetchingPosts = true
        },
        [fetchPosts.rejected]:state=>{
            state.fetchingPosts=false
            state.errorMessage='خطا در انجام عملیات'
        }
    }
});

export default PostSlice.reducer;