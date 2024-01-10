import { useTheme } from "@react-navigation/native";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";


function PopUpModal(props: { isPopupMenuVisible: any, togglePopupMenu: any, onPress: any }) {
    const { isPopupMenuVisible, togglePopupMenu, onPress, } = props
    const { colors, dark } = useTheme()
    return (

        <Modal
            transparent={true}
            visible={isPopupMenuVisible}
            onRequestClose={togglePopupMenu}
            pointerEvents="box-none">
            <TouchableWithoutFeedback onPress={togglePopupMenu} accessible={false} >

                <View style={{
                    flex: 1,
                    margin: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    alignItems: 'flex-end'
                }}>
                    <TouchableOpacity onPress={togglePopupMenu}>
                        <Text style={{ color: colors.text, fontSize: 17, backgroundColor: colors.background, margin: 35, borderWidth: 0.1, borderColor: 'gray', borderRadius: 10, padding: 5 }}
                            onPress={onPress}>
                            Add Category
                        </Text>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>

        </Modal>
    )
}
const styles = StyleSheet.create({
    modalContaine: {
        flex: 1,
        marginTop: 50,
        marginStart: 240,
        padding: 5,
        shadowRadius: 10,
        alignContent: 'flex-end',
        backgroundColor: '',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 7,
        borderColor: '#F8F8F8',
        borderWidth: 0.8
    },
    modalContainer: {
        flex: 1,
        margin: 10,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        alignItems: 'flex-end'
        // backgroundColor:'white'
    },
})
export default PopUpModal;