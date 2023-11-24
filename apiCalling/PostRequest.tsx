import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    Alert
} from 'react-native'
import { store } from '../reduxIntegration/Store';
import { loginAuth } from '../reduxIntegration/Reducer';
import { APIBASEURL, BEARERTOKEN, LOGIN } from '../constants/ApiConstants';
function PostRequest(props: {requestData: { email: String, password: String } }) {
    
    const {  requestData } = props
    const apiURL = APIBASEURL + LOGIN

    const headers = {
        Authorization: `Bearer ${BEARERTOKEN}`,
        "Content-Type": "application/json",
    };
    fetch(apiURL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(requestData)
    }).then((response) => {
        if (!response.ok) {
            return Alert.alert("warning", "api response error")
        }
        return response.json()
    })
        .then(async (data) => {
            try {
                await AsyncStorage.setItem('email', data.data.email)
                await AsyncStorage.setItem('password', data.data.password)
                store.dispatch(loginAuth(data.data))
                console.log('saved successfully in shared Preference ')
            } catch {
                console.error('not saved in local storage')
            }
        }
        )
        .catch((error: any) => {
            console.error('Error during get request:', error);
        })

}
export default PostRequest;