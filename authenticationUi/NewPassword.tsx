import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppIconComponent from "../reuseableComponent/AppIconImage";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import TextInputCom from "../reuseableComponent/TextInputComponent";
import React from "react";
import storage from "@react-native-firebase/storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";

function NewPassword() {
    const navigation = useNavigation()
    const route = useRoute();
    const data = route.params
    const [password, setPassword] = useState("")
    const [profileImage, setProfileImage] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")

    const imageUrl = useSelector((state: RootState) => {
        return state.allUserData.userData[data.userId]?.profileImage || 'DefaultName';
    })

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
    return (
        <ScrollView style={style.container}>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/backArrow.png")} style={{ width: 50, height: 50, resizeMode: 'center', marginEnd: 5, alignItems: 'flex-start' }} />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 30, }}>
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

                <Text style={{ alignSelf: 'center', color: 'black', marginTop: 20, marginBottom: 50, fontSize: 20, fontWeight: 'bold' }}>
                    Enter New Password
                </Text>
                <Text style={style.inputText}>
                    New Password
                </Text>
                <TextInputCom
                    value={password}
                    onChangeText={(text: React.SetStateAction<string>) => setPassword(text)}
                    placeholder="min 6 character" secureTextEntry={false} />
                <Text style={style.inputText}>
                    Confirm Password
                </Text>
                <TextInputCom
                    value={confirmPassword}
                    onChangeText={((text: React.SetStateAction<string>) => setConfirmPassword(text))}
                    placeholder="min 6 character" secureTextEntry={true} />
                <ButtonComponent buttonTittle="Submit" onPress={() => navigation.goBack} />
            </View>
        </ScrollView>)
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 35,
        marginTop: 15
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginStart: 110,
        overflow: 'hidden',
        elevation: 20,
        borderColor: 'gray',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
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

export default NewPassword;