import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    auth: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
    },
});

export const { setUser, setAuth } = userSlice.actions;
export default userSlice.reducer;
