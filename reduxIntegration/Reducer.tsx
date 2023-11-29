import { createSlice } from "@reduxjs/toolkit";

export const loginAuthentication = createSlice({
    name: 'LoginAuth',
    initialState: {
        email: '',
        password: '',
        userId: '',
        userName: ""
    },
    reducers: {
        loginAuth: (state, action) => {
            console.log("state UserId", action)
            state.email = action.payload.email
            state.password = action.payload.password
            state.userId = action.payload.userId
            state.userName = action.payload.userName
        }

    }
})
export const { loginAuth } = loginAuthentication.actions