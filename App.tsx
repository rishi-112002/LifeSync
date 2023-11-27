import React, {createContext } from 'react';
import { Provider } from 'react-redux';
import { store } from './reduxIntegration/Store'
import AppNavigation from './AppNavigation';
// import { initializeApp } from '@react-native-firebase/app';

export const Context = createContext(false);

 
function App() {
   
    return (
        <Provider store={store} >
          <AppNavigation/>
        </Provider>
    )
}
export default App;