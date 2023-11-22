import { configureStore } from '@reduxjs/toolkit'
import { loginAuthentication } from './Reducer'

export const store = configureStore({
    reducer :{loginAuth : loginAuthentication.reducer}
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;