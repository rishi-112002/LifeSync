import { createSlice } from "@reduxjs/toolkit";

export const loginAuthentication = createSlice({
    name: 'LoginAuth',
    initialState: {
        email: '',
        password: ''
    },
    reducers: {
        loginAuth: (state, action) => {
            state.email = action.payload.userEmail
            state.password = action.payload.userPassword
        }
    }
})
export const { loginAuth } = loginAuthentication.actions