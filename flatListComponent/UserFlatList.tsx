import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootState, store } from "../reduxIntegration/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginAuth } from "../reduxIntegration/Reducer";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import Share from 'react-native-share';
import { useSelector } from "react-redux";
import ThemeSelectionModal from "../reuseableComponent/ThemeSelectionModal";
function UserFlatList() {
    const [modal, setModal] = useState(false)
    const logoutUser = async () => {
        try {
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('password');
            console.log('user is logout successfully')
        } catch {
            console.error('user data is not Deleted')
        }

    };
    const handleThemeModal = () => {
        setModal(!modal)
    }
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
    const handleDelete = () => {
        Alert.alert(
            "Warning",
            "Are you sure to Logout ?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: () => {
                        handleLogout();
                    },
                },
            ],
            { cancelable: false }
        )
        console.log('Delete button pressed');
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
            text: "Theme"
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
    const share = async () => {
        try {
            const options = {
                title: 'BookStore App',
                message: 'Check out this awesome app!',
                url: 'https://your-app-url.com',
            };

            await Share.open(options);
        } catch (error) {
            console.log('Error sharing app:', error.message);
        }
    };
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });
    const userEmail = useSelector((state: RootState) => {
        return state.loginAuth.email
    });
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
                            navigation.navigate("ChangePassword", { userId: userId, userEmail: userEmail })
                            break;
                        case 'Liked Posts':
                            navigation.navigate("LikedPostScreen")
                            break;
                        case 'Theme':
                            handleThemeModal()
                            console.log("hello")
                            break;
                        case 'Privacy Policy':
                            navigation.navigate("PrivacyPolicy")
                            break;
                        case 'Terms Of usage':
                            navigation.navigate("TermsOfUsage")
                            break;

                        case 'Ratting app':

                            break;

                        case 'Share app':
                            share()
                            break;

                        case 'Logout':
                            handleDelete();
                            break;

                        default:
                            break;
                    }
                };
                return (
                    <View style={styles.methodListContainer}>
                        <TouchableOpacity onPress={handlePress} >
                            <Text style={styles.methodList} >
                                {item.item.text}
                            </Text>
                        </TouchableOpacity>
                        {
                            modal &&
                            <ThemeSelectionModal modalVisible={modal} setModalVisible={setModal} navigationToScreen={undefined} postId={undefined} commentId={undefined} />
                        }
                    </View>
                )
            }}
        />
    )
}

const styles = StyleSheet.create({
    methodListContainer: {
        flex: 1,
        marginStart: 20,
        marginEnd: 10
    },
    methodList: {
        color: 'black',
        marginTop: 10,
        marginBottom: 7,
        borderRadius: 10,
        borderWidth: 1,
        paddingTop: 5,
        paddingStart: 20,
        borderBottomColor: 'lightgrey',
        borderRightColor: 'white',
        borderTopColor: 'white',
        borderLeftColor: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default UserFlatList;