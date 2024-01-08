import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, Appearance } from 'react-native';
const ThemeSelectionModal = (props: { modalVisible: any, setModalVisible: any, navigationToScreen: any, postId: any, commentId: any }) => {
    const { modalVisible, setModalVisible } = props

    const handleLightTheme = () => {
        Appearance.setColorScheme("light")
        setModalVisible(false)
    }
    const handleDarkTheme = () => {
        Appearance.setColorScheme("dark")
        setModalVisible(false)
    }
    const { colors } = useTheme()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)} accessible={false} >
                <View style={styles.modalContainer}>
                    <View style={{
                        backgroundColor: colors.background,
                        padding: 20,
                        borderRadius: 10,
                        elevation: 5,
                    }}>

                        <TouchableOpacity onPress={() => handleDarkTheme()}>
                            <Text style={{
                                padding: 4,
                                paddingStart: 16,
                                borderColor: "white",
                                borderRadius: 5,
                                borderWidth: 0.5,
                                marginTop: 10,
                                fontSize: 17,
                                fontWeight: "500",
                                color: colors.text,
                                marginStart: 5
                            }}>Dark Theme</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleLightTheme()}>
                            <Text style={{
                                padding: 4,
                                paddingStart: 16,
                                borderColor: "white",
                                borderRadius: 5,
                                borderWidth: 0.5,
                                marginTop: 10,
                                fontSize: 17,
                                fontWeight: "500",
                                color: colors.text,
                                marginStart: 5
                            }}>Light theme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{
                                padding: 4,
                                paddingStart: 16,
                                borderColor: "white",
                                borderRadius: 5,
                                borderWidth: 0.5,
                                marginTop: 10,
                                fontSize: 17,
                                fontWeight: "500",
                                color: colors.text,
                                marginStart: 5
                            }}>Default or System</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>

    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default ThemeSelectionModal;
