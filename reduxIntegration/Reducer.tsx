import { createSlice } from "@reduxjs/toolkit";

export const loginAuthentication = createSlice({
    name: 'LoginAuth',
    initialState: {
        email: '',
        password: '',
        userId: '',
    },
    reducers: {
        loginAuth: (state, action) => {
            console.log("state UserId",action)
            state.email = action.payload.email
            state.password = action.payload.password
            state.userId = action.payload.userId
        }
        
    }
})
export const { loginAuth } = loginAuthentication.actions