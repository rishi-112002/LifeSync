import React from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { store } from "../reduxIntegration/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginAuth } from "../reduxIntegration/Reducer";
import GetApiRequest from "../apiCalling/GetRequest";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";

function UserFlatList() {
    const logoutUser = async () => {
        try {
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            console.log('user is logout successfully')
        } catch {
            console.error('user data is not Deleted')
        }

    };
    const handleLogoutUser = () => {
        auth().signOut().then(() => {
            console.log("LogoutUser Successfully")
        }).catch((error) => {
            console.log("error", error)
        })
    }
    const navigation = useNavigation()
    const handleLogout = () => {
        handleLogoutUser();
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
            text: "Liked Posts"
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
                            navigation.navigate("UserProfileScreen")
                            break;

                        case 'Change Password':     
                            navigation.navigate("ChangePassword")
                            break;
                        case 'Liked Posts':
                           navigation.navigate("LikedPostScreen")
                            break;

                        case 'Terms Of usage':
                            GetApiRequest();
                            break;

                        case 'Ratting app':
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