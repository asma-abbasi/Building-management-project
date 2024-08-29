import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: 0
};

function increament(state) {
    state.value += 1;
}

function decreament(state) {
    state.value -= 1;
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increament,
        decreament
    }
});

export const { increament: increamentAction, decreament: decreamentAction } = counterSlice.actions;

export default counterSlice.reducer;