import React from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ThemeContext } from '../AppNavigation';
const ThemeSelectionModal = (props: { modalVisible: any, setModalVisible: any, navigationToScreen: any, postId: any, commentId: any }) => {
    const { theme, setTheme } = React.useContext(ThemeContext);
    const { modalVisible, setModalVisible } = props
    const handleLightTheme = () => {
        setTheme(theme === 'Light' ? 'Dark' : 'Light')
        setModalVisible(false)
    }
    const handleDarkTheme = () => {
        setTheme(theme === 'Light' ? 'Light':'Dark')
        setModalVisible(false)
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)} accessible={false} >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

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
                                color: 'black',
                                marginStart: 5
                            }}>Dark Theme</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleLightTheme()}>
                            <Text style={{
                                // backgroundColor: 'red',
                                padding: 4,
                                paddingStart: 16,
                                borderColor: "white",
                                borderRadius: 5,
                                borderWidth: 0.5,
                                marginTop: 10,
                                fontSize: 17,
                                fontWeight: "500",
                                color: 'black',
                                marginStart: 5
                            }}>Light theme</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={{
                                // backgroundColor: 'gray',
                                padding: 4,
                                paddingStart: 16,
                                borderColor: "white",
                                borderRadius: 5,
                                borderWidth: 0.5,
                                marginTop: 10,
                                fontSize: 17,
                                fontWeight: "500",
                                color: 'gray',
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
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    themeButton: {
        marginVertical: 5,
        color: 'black'
    },
    applyButton: {
        marginTop: 15,
        backgroundColor: 'green', // Customize the color as needed
    },
});

export default ThemeSelectionModal;
