import React from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState, store } from "../reduxIntegration/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginAuth } from "../reduxIntegration/Reducer";
import PostRequest from "../apiCalling/PostRequest";

function UserFlatList() {

    const userEmail = useSelector((state: RootState) => {
        console.log('state', state);
        return state.loginAuth.email
    })
    const userPassword = useSelector((state: RootState) => state.loginAuth.password)

    const logoutUser = async () => {
        try {
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            console.log('user is logout successfully')
        } catch {
            console.error('user data is not Deleted')
        }

    };

    const handleLogout = () => {
        const object = {
            userEmail: '',
            userPassword: '',
        }
        store.dispatch(loginAuth(object))
        logoutUser();
    };

    const userMethod = [
        {
            text: "Edit Profile"
        },
        {
            text: "Change Password"
        },
        {
            text: "Privacy Policy"
        },
        {
            text: "Terms Of usage"
        },
        {
            text: "Ratting app"
        },
        {
            text: "Share app"
        },
        {
            text: "Logout"
        }
    ];
    return (
        <FlatList
            data={userMethod}
            renderItem={(item) => {
                const handlePress = () => {
                    switch (item.item.text) {

                        case 'Edit Profile':
                            Alert.alert("Bryan Johnson", userEmail)
                            break;

                        case 'Change Password':
                            Alert.alert("warning", "click on Change Password")
                            break;


                        case 'Privacy Policy':
                          PostRequest();
                            break;

                        case 'Terms Of usage':
                            Alert.alert("warning", "click on Terms Of usage")
                            break;

                        case 'Ratting app':
                            Alert.alert("warning", "click onRatting app")
                            break;

                        case 'Share app':
                            Alert.alert("warning", "click on Share app")
                            break;

                        case 'Logout':
                            handleLogout();
                            break;

                        default:
                            break;
                    }
                };
                return (
                    <View>
                        <TouchableOpacity onPress={handlePress}>
                            <Text style={styles.methodList} >
                                {item.item.text}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({

    methodList: {
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'left',
        alignContent: 'space-between',
        width: 330,
        borderRadius: 2,
        borderWidth: 1,
        padding: 8,
        borderBottomColor: 'lightgrey',
        borderRightColor: 'white',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default UserFlatList;