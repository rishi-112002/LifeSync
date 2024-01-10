import { useEffect, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppIconComponent from "../reuseableComponent/AppIconImage";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import React from "react";
import storage from "@react-native-firebase/storage";
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import PasswordInput from "../reuseableComponent/PasswordInput";

function NewPassword() {
    const navigation = useNavigation()
    const route = useRoute();
    const data = route.params
    const [password, setPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [profileImage, setProfileImage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const imageUrl = useSelector((state: RootState) => {
        return state.allUserData.userData[data.userId]?.profileImage || 'DefaultName';
    })
    console.log("data" , data)

    async function getImage() {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(imageUrl);
            const url = await imageRef.getDownloadURL();
            setProfileImage(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }
    useEffect(() => {
        if (data.userId) {
            getImage()
        }
    }, []);
    const { colors, dark } = useTheme()
    const handleChange = async () => {
        if (!oldPassword) {
            Alert.alert("warning", "please enter oldPassword not empty")
            return
        }
        if (!password) {
            Alert.alert("warning", "Password not empty")
            return
        }
        if (!confirmPassword) {
            Alert.alert("warning", "confirmPassword not empty")
            return
        }
        if (password != confirmPassword) {
            Alert.alert("warning", "password  and confirm password should be same ")
            return
        }
        if (oldPassword == password || password == confirmPassword) {
            setNewPassword(password)

        }
        else {
            setCurrentPassword(oldPassword)
        }

    }



    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: colors.background,
        }}
            contentContainerStyle={{ paddingBottom: 90, }}>
            <KeyboardAvoidingView>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, marginStart: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={dark ? require("../assets/backButtonForDarkTheme.png") : require("../assets/backArrow.png")} style={{ width: 40, height: 25, resizeMode: 'contain', marginEnd: 5, marginTop: 6 }} />
                    </TouchableOpacity>
                    {data.userName && <Text style={{ color: colors.text, fontSize: 25, fontWeight: 'bold' }}>
                        {data.userName}
                    </Text>
                    }
                </View>
                <View>
                    {data.userId ? (<View style={style.imageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={style.profileImage} />
                        ) : (
                            <View style={style.placeholderContainer}>
                                <Text style={style.placeholderText}>profileImage</Text>
                            </View>
                        )}
                    </View>)
                        : (<AppIconComponent />)
                    }

                    <Text style={{ alignSelf: 'center', color: colors.text, marginTop: 15, marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>
                        Enter New Password
                    </Text>
                    {data.userEmail &&
                        <><Text style={{
                            color: colors.text,
                            fontSize: 16,
                            fontWeight: 'bold',
                            marginStart: 35,
                            marginTop: 10
                        }}>
                            old Password
                        </Text><PasswordInput value={oldPassword}
                            onChangeText={(text: string) => {
                                if (text.includes(' ')) {
                                    setOldPassword(text.trim());
                                } else {
                                    setOldPassword(text);
                                }
                            }}
                            placeholder="" keyBoardType="normal" /></>}
                    <Text style={{
                        color: colors.text,
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginStart: 35,
                        marginTop: 10
                    }}>
                        New Password
                    </Text>
                    <PasswordInput value={password}
                        onChangeText={(text: string) => {
                            if (text.includes(' ')) {
                                setPassword(text.trim());
                            } else {
                                setPassword(text);
                            }
                        }
                        }
                        placeholder="min 6 character" keyBoardType="normal" />
                    <Text style={{
                        color: colors.text,
                        fontSize: 16,
                        fontWeight: 'bold',
                        marginStart: 35,
                        marginTop: 10
                    }}>
                        Confirm Password
                    </Text>


                    <PasswordInput value={confirmPassword}
                        onChangeText={(text: string) => {
                            if (text.includes(' ')) {
                                setConfirmPassword(text.trim());
                            } else {
                                setConfirmPassword(text);
                            }
                        }
                        }
                        placeholder="" keyBoardType="normal" />
                    <ButtonComponent buttonTittle="Submit" onPress={handleChange} />
                </View>
            </KeyboardAvoidingView >
        </ScrollView>)
};

export default NewPassword;

const style = StyleSheet.create({
    container: {

    },
    inputText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 35,
        marginTop: 5
    },
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: 100,
        marginStart: '35%',
        overflow: 'hidden',
        elevation: 10,
        marginEnd: 10,
        borderColor: 'gray',
        backgroundColor: '#f0f0f0',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        alignSelf: 'center'
    },
    placeholderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 25,
        color: '#777',
    },
})

