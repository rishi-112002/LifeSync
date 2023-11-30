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
            // console.log("state UserId", action)
            state.email = action.payload.email
            state.password = action.payload.password
            state.userId = action.payload.userId
            state.userName = action.payload.userName
        }

    }
})
export const allUserDataList = createSlice({
    name: "AllUserData",
    initialState: { userData:{}},
    reducers: {
        allUserDetails: (state, action) => {
            state.userData = action.payload
            // console.log(state)
        }
    }
})
export const { loginAuth } = loginAuthentication.actions
export const { allUserDetails } = allUserDataList.actions