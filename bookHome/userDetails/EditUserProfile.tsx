import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import SelectProfileImagePopUp from "../../reuseableComponent/SelectProfileImagePopUp";
import TextInputCom from "../../reuseableComponent/TextInputComponent";
import CountryCodePicker from "../../reuseableComponent/CountryCodePicker";
import DropDownPicker from "react-native-dropdown-picker";
import ButtonComponent from "../../reuseableComponent/ButtonComponent";
import { serverTimestamp } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import GetAllUserData from "../../fireStoreHandle/GetAllUserData";
import storage from "@react-native-firebase/storage";
function EditUserProfile() {
    const route = useRoute()
    const data = route.params
    const { colors, dark } = useTheme()
    const navigation = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    const [userName, setUserName] = useState(data.userData.name)
    const [Address, setAddress] = useState(data.userData.address)
    const [phoneNo, setPhoneNo] = useState(data.userData.mobile)
    const [gender, setGender] = useState(data.userData.gender)
    const [countryCode, setCountryCode] = useState(data.userData.countryCode);
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };
    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const genderOptions = [
        {
            label: "male",
            value: 'm'
        },
        {
            label: "Female",
            value: 'f'
        },
        {
            label: "other",
            value: 'o'
        },
    ];
    const handleUserData = () => {

        if (!userName) {
            Alert.alert("warning", "please enter name")
            return
        }
        if (!Address) {
            Alert.alert("warning", "please enter name")

            return
        }
        if (!gender) {
            Alert.alert("warning", "please enter name")
            return
        }
        if (!phoneNo) {
            Alert.alert("Warning", "please select a image")
            return
        }
        if (!countryCode) {
            Alert.alert("Warning", "please select a Category")
            return
        }
        updateUserToFireStore();

    }
    const [imageUrl, setImageUrl] = useState("")
    const usersCollection = firestore().collection('users');
    const userDetails = () => {
        usersCollection
            .where("email", "==", data.userEmail).onSnapshot
            ((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    console.log("doc", doc._data.name)
                    getImage(doc._data.profileImage)
                })
            })

    };
    async function getImage(imageUri: any) {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(imageUri);
            const url = await imageRef.getDownloadURL();
            setImageUrl(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }
    useEffect(() => {
        userDetails();
    }, []);
    const updateUserToFireStore = async () => {
        const userData = {
            address: Address,
            countryCode: countryCode,
            gender: gender,
            mobile: phoneNo,
            name: userName,
            updatedAt: serverTimestamp(),
        }
        firestore().collection("users").doc(data.userId).update(userData).then(() => {
            console.log("added successfully")
            GetAllUserData()
            navigation.goBack()
        }).catch((Error) => console.log("error ", Error))

    }




    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'column', }}>
                <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, marginStart: 10 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")} style={{ width: 40, height: 25, resizeMode: 'contain', marginEnd: 5, marginTop: 6 }} />
                    </TouchableOpacity>
                    <Text style={{ color: colors.text, fontSize: 25, fontWeight: 'bold' }}>
                        Edit Profile
                    </Text>
                </View>
                <View style={style.imageContainer}>
                    {imageUrl ? (
                        <Image source={{ uri: imageUrl }} style={style.profileImage} />
                    ) : (
                        <View style={style.placeholderContainer}>
                            <Text style={style.placeholderText}>profileImage</Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity onPress={handleOpenModal}>
                    <Text style={{ textAlign: 'center', margin: 5, fontSize: 14, color: colors.primary }}>
                        Edit Picture or Remove
                    </Text>
                </TouchableOpacity>
                {isModalVisible &&
                    <SelectProfileImagePopUp visible={isModalVisible} onClose={handleCloseModal} profileUri={data.profileImage} />
                }

                <Text style={{ color: colors.text, marginStart: 19, fontSize: 17, marginTop: 5, marginBottom: -5 }}>
                    Name
                </Text>
                <TextInputCom placeholder={""} value={userName} onChangeText={setUserName} secureTextEntry={false} errorMessage={""} keyBoardType={'default'} />
                <Text style={{ color: colors.text, marginStart: 19, fontSize: 17, marginTop: 5, marginBottom: -5 }}>
                    Address
                </Text>
                <TextInputCom placeholder={""} value={Address} onChangeText={setAddress} secureTextEntry={false} errorMessage={""} keyBoardType={'default'} />
                <Text style={{ color: colors.text, marginStart: 19, fontSize: 17, marginTop: 5, marginBottom: -5 }}>
                    Phone no.
                </Text>
                <View style={{ flexDirection: 'row', borderColor: colors.text, borderWidth: 0.8, marginStart: 17, marginEnd: 15, borderRadius: 10, marginTop: 5, padding: 3 }}>
                    <TouchableOpacity
                        onPress={() => setShow(true)}
                        style={{
                            width: 'auto',
                            margin: 3,
                            backgroundColor: colors.background,
                        }}
                    >
                        <Text style={{
                            color: colors.text,
                            fontSize: 14,
                            height: 35,
                            padding: 10,
                            borderRadius: 10,
                            backgroundColor: colors.card

                        }}>
                            {`${countryCode || '+91'}`}
                        </Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder="please enter here"
                        placeholderTextColor={colors.border}
                        textContentType="emailAddress"
                        style={{
                            flex: 1,
                            height: 43,
                            width: '50%',
                            padding: 7,
                            marginTop: -2,
                            marginEnd: 5,
                            fontSize: 18
                        }}
                        keyboardType="number-pad"
                        value={phoneNo}
                        onChangeText={(text) => setPhoneNo(text)}
                    />
                </View>
                <View style={{ padding: 10, marginStart: 6, marginEnd: 5, marginTop: 5 }}>
                    <DropDownPicker
                        items={genderOptions}
                        open={isOpen}
                        value={gender}
                        setOpen={() => setIsOpen(!isOpen)}
                        setValue={(val) => setGender(val)}
                        placeholder="Gender"
                        style={{
                            alignItems: 'center',
                            backgroundColor: colors.background,
                            borderColor: colors.border,
                        }}
                        maxHeight={200}
                        autoScroll
                        keyboardShouldPersistTaps="handled"
                        placeholderStyle={{ color: colors.text, fontWeight: 'bold', fontSize: 15 }}
                        dropDownDirection='AUTO'
                    />
                </View>
                {show && <KeyboardAvoidingView>
                    <CountryCodePicker show={show} setShow={setShow} setCountryCode={setCountryCode} />
                </KeyboardAvoidingView>}
                <ButtonComponent buttonTittle={"save"} onPress={handleUserData} />
            </View>
        </View>
    )
}

const style = StyleSheet.create({


    container: {
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white'
    },
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: 100,
        overflow: 'hidden',
        elevation: 10,
        borderColor: 'gray',
        backgroundColor: '#f0f0f0',
        marginStart: "34%",
        marginTop: 10
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
    containers: {
        flexDirection: 'row',
        width: 350,
        height: 80,
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-around',
        backgroundColor: '#f0f0f0',
        borderRadius: 20
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    count: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007BFF',
    },
})
export default EditUserProfile;
