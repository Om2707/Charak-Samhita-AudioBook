// src/slices/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null, // You can adjust this to include any initial user data
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; // Set the user data
        },
        clearUser: (state) => {
            state.user = null; // Clear the user data
        },
    },
});

// Export the actions and reducer
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
