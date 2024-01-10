import React from "react";
import { Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

function FullScreenImagePopUp(props: { visible: any, onClose: any, profileUri: any }) {
    const { visible, onClose, profileUri } = props
    console.log("profileUri", profileUri)
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Image source={{ uri: profileUri }} style={styles.profileImage} />
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
        padding: 95,
        borderRadius: 10,
        elevation: 15,
        flex: 1,

    },
    profileImage: {
        width: 290,
        height: 350,
        borderRadius: 5,
        padding: 20,
        margin: 50,
        resizeMode: 'center'
    },
});

export default FullScreenImagePopUp;


