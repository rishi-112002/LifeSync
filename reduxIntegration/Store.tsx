import { configureStore } from '@reduxjs/toolkit'
import { allUserDataList, loginAuthentication } from './Reducer'

export const store = configureStore({
    reducer :{loginAuth : loginAuthentication.reducer , allUserData : allUserDataList.reducer}
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;