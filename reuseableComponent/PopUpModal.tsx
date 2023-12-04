import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


function PopUpModal(props: { isPopupMenuVisible: any, togglePopupMenu: any, onPress: any }) {
    const { isPopupMenuVisible, togglePopupMenu, onPress } = props
    return (
        <Modal
            transparent={true}
            visible={isPopupMenuVisible}
            onRequestClose={togglePopupMenu}>
            <View style={styles.modalContainer}>
                <TouchableOpacity onPress={togglePopupMenu}>
                    <Text style={{ color: 'black', fontSize: 17 }}
                        onPress={onPress}>
                        Add Category
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        width: 130,
        marginTop: 50,
        marginStart: 240,
        padding: 5,
        shadowRadius: 10,
        alignContent: 'flex-end',
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 7,
        borderColor: '#F8F8F8',
        borderWidth: 0.8
    },
})
export default PopUpModal;