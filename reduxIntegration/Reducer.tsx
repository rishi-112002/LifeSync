import { createSlice } from "@reduxjs/toolkit";

export const loginAuthentication = createSlice({
    name: 'LoginAuth',
    initialState: {
        email: '',
        password: ''
    },
    reducers: {
        loginAuth: (state, action) => {
            state.email = action.payload.email
            state.password = action.payload.password
        }
    }
})
export const { loginAuth } = loginAuthentication.actions