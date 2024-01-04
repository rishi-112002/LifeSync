import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, Alert, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import ButtonComponent from "../reuseableComponent/ButtonComponent";
import TextInputCom from "../reuseableComponent/TextInputComponent";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { serverTimestamp } from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import PasswordInput from "../reuseableComponent/PasswordInput";
import Snackbar from "react-native-snackbar";
import { View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import PopUpLoader from "../reuseableComponent/PopUpLoader";

function SignupScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [userId, setUserId] = useState<string | null>("");
    const showToast = () => {
        console.log("hello snack bar ")
        Snackbar.show({
            text: 'Welcome You successfully SignedUpl! Please Login?',
            duration: 2000,
            numberOfLines: 2,
            textColor: '#fff',
            backgroundColor: 'green',
            action: {
                text: 'Ok',
                textColor: '#fff',
                onPress: () => {
                    console.log("toastPressed")
                }
            }
        });
    };
    const [loading, setLoading] = useState(false);

    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const handleSignInAuth = () => {
        if (!name) {
            Alert.alert("waning", "Please enter name")
            return
        }
        if (!email) {
            Alert.alert("waning", "Please enter email")
            return
        }
        handleEmail();

    }
    const handleEmail = () => {
        if (!emailRegex.test(email)) {
            Alert.alert("warning", "entered email is invalid")
            console.log("InValid email")
            return
        }
        handlePassword();
    }
    const handlePassword = () => {
        if (!password) {
            Alert.alert("Warning", "Please enter password");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Warning", "Password is invalid (less than 6 characters)");
            return;
        }
        if (!profileImage) {
            Alert.alert("Warning", "Please select your profile Image");
            return;
        }
        else {
            setLoading(true)
            addNewUser(email, password);
        }
    };
    const [profileImage, setProfileImage] = useState("");

    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('Image picker error: ', response.errorMessage);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setProfileImage(imageUri);
            }
        });
    };
    const uploadPhoto = async () => {
        const uploadUri = profileImage
        let FileName = `ProfileImage/${uploadUri.substring(uploadUri.lastIndexOf('/') + 1)}`

        try {
            const reference = storage().ref(FileName)
            const task = reference.putFile(uploadUri)
            task.on('state_changed', (taskSnapshot: { bytesTransferred: any; totalBytes: any; }) => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            })
            task.then(() => {
                addUserData(FileName)
            })
        } catch (error) {
            setLoading(false)
            console.log("photo not uploaded", error)
        }
        ;
    }
    const addNewUser = async (email: any, password: any) => {
        try {
            await auth().createUserWithEmailAndPassword(email, password).then(async (success) => {
                const newUserId = auth().currentUser?.uid;
                setUserId(newUserId)
                await uploadPhoto()
            })
            console.log('User added successfully!');

        } catch (error) {
            setLoading(false)
            console.error('Error adding user:', error.message);
            Alert.alert("warning", "User is already exits Please try to login")
            return
        }
    };
    const showToastAndNavigate = () => {
        showToast();
        navigation.navigate("Login");
    };

    const addUserData = async (fileName: any) => {
        const userData = {
            address: "Indore",
            countryCode: "+91",
            createdAt: serverTimestamp(),
            email: email,
            gender: "m",
            mobile: "1234567890",
            name: name,
            status: "active",
            updatedAt: serverTimestamp(),
            userId: userId,
            profileImage: fileName,
            followBy: [],
            follower: 0,
            following: [],
            followingCount: 0
        }
        try {
            await firestore().collection("users").doc(userId).set(userData).then((success) => {
                setLoading(false)
                showToastAndNavigate()
            }).catch((error) => console.log("error while make the user ", error))

        } catch (error) {
            setLoading(false)
            console.log('Error adding user:', error.message, userData);
            Alert.alert("warning", "User is already exits Please try to login")
            return
        }
    }
    return (
        <ScrollView style={style.containers} keyboardShouldPersistTaps="handled">
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/backArrow.png")} style={{ width: 50, height: 35, resizeMode: "contain", marginTop: 15, marginStart: 5 }} />
                </TouchableOpacity>

                <Text style={{ alignSelf: 'center', color: 'black', marginTop: 10, fontSize: 30, fontWeight: 'bold', marginEnd: 'auto', marginStart: 20 }}>
                    Sign up
                </Text>
            </View>
            <View style={style.container}>
                <TouchableOpacity onPress={() => openImagePicker()}>
                    <View style={style.imageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={style.profileImage} />
                        ) : (
                            <View style={style.placeholderContainer}>
                                <Text style={style.placeholderText}>profileImage</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            <Text style={style.inputText}>
                Name
            </Text>
            <TextInputCom
                value={name}
                onChangeText={(text: React.SetStateAction<string>) => setName(text)}
                placeholder="" secureTextEntry={false} />
            <Text style={style.inputText}>
                Email
            </Text>
            <TextInputCom
                value={email}
                keyBoardType={"email-address"}
                onChangeText={(text: string) => {
                    if (text.includes(' ')) {
                        Alert.alert("Warning", "Spaces are not allowed in the email")
                        setEmail(text.trim());
                    } else {
                        setEmail(text);
                    }
                }
                }
                placeholder="" secureTextEntry={false} />
            <Text style={style.inputText}>
                Password
            </Text>
            <PasswordInput value={password}
                onChangeText={(text: string) => {
                    if (text.includes(' ')) {
                        Alert.alert("Warning", "Spaces are not allowed in the password")

                        setPassword(text.trim());
                    } else {
                        setPassword(text);
                    }
                }
                }
                placeholder="min 6 character" keyBoardType="normal" />
            <ButtonComponent buttonTittle="Sign up" onPress={handleSignInAuth} />
            {loading && <PopUpLoader />}
            <Text style={{ alignSelf: 'center', color: 'blue', marginTop: 20, fontSize: 14, marginEnd: 15, fontWeight: 'bold', flex: 1 }} onPress={() => navigation.navigate('Login')}>
                Already have an account, Login?
            </Text>
        </ScrollView>)
};

const style = StyleSheet.create({
    containers: {
        flex: 1,
        backgroundColor: 'white'
    },
    inputText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
        marginStart: 25,
        marginTop: 20,
  
    },
    container: {
        alignItems: 'center',
        marginTop: 25
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
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

export default SignupScreen;


