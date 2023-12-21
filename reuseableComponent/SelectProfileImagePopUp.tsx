import React, { useState } from "react";
import { Alert, Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";

function SelectProfileImagePopUp(props: { visible: any, onClose: any, profileUri: any }) {
    const { visible, onClose, profileUri } = props
    const handleCancel = () => {
        if (imageUri) {
            uploadPhoto();
            return
        }
        onClose();
    };
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })
    const [imageUri, setImageUri] = useState()
    const handleChange = () => {
        openImagePicker()
    };
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
                setImageUri(imageUri);
            }
        });
    };
    const uploadPhoto = async () => {
        const uploadUri = imageUri ?? profileUri;
        let FileName = `ProfileImage/${uploadUri.substring(uploadUri.lastIndexOf('/') + 1)}`

        try {
            const reference = storage().ref(FileName)
            const task = reference.putFile(uploadUri)
            task.on('state_changed', (taskSnapshot: { bytesTransferred: any; totalBytes: any; }) => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

            })
            task.then((success) => {
                updateUserProfile(FileName);
            })
        } catch (error) {
            console.log("photo not uploaded", error)
        }

    }
    const updateUserProfile = async (FileName: string) => {
        const profileUpdateImage = {
            profileImage: FileName
        }
        try {
            await firestore().collection("users").doc(userId).update(profileUpdateImage).then((success) => {
                onClose()
            }).catch((error) => console.log("error while make the user ", error))

        } catch (error) {
            console.error('Error adding user:', error.message);
            Alert.alert("warning", "User is already exits Please try to login")
            return
        }
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}></Text>

                        <Image source={{ uri: imageUri ? imageUri : profileUri }} style={styles.profileImage} />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleChange}>
                                <Text style={{ color: "white", backgroundColor: 'blue', marginStart: 'auto', fontSize: 21, fontWeight: '500', borderRadius: 10, padding: 5 }} >
                                    change
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCancel}>
                                <Text style={{ color: "white", backgroundColor: 'gray', marginStart: 'auto', fontSize: 21, fontWeight: '500', borderRadius: 10, padding: 5 }}>
                                    {imageUri ? "submit" : "cancel"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        flex: 1,
        margins: 100
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        color: "black",
        fontWeight: '500'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginBottom: 15,
        height: 60,
        color: "black",
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
    },
    profileImage: {
        width: 350,
        height: 350,
        borderRadius: 50,
        padding: 20,
        margin: 50
    },
});

export default SelectProfileImagePopUp;


