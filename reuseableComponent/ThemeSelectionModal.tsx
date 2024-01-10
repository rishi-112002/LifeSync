import React, { useCallback } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, Appearance } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ThemeSelectionModal = (props: { modalVisible: any, setModalVisible: any }) => {
    const { modalVisible, setModalVisible } = props;
    const { colors } = useTheme();

    const handleThemeChange = useCallback(
        (s: any) => {
            Appearance.setColorScheme(s);
            setModalVisible(false);
        },
        [setModalVisible]
    );

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)} accessible={false}>
                <View style={styles.modalContainer}>
                    <View style={{
                        backgroundColor: colors.background,
                        padding: 20,
                        borderRadius: 10,
                        elevation: 5,
                    }}>

                        <TouchableOpacity onPress={() => handleThemeChange("dark")}>
                            <Text style={styles.themeText}>Dark Theme</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleThemeChange("light")}>
                            <Text style={styles.themeText}>Light theme</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => handleThemeChange("light")}>
                            <Text style={styles.themeText}>Default or System</Text>
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
    themeText: {
        padding: 4,
        paddingStart: 16,
        borderColor: "white",
        borderRadius: 5,
        borderWidth: 0.5,
        marginTop: 10,
        fontSize: 17,
        fontWeight: "500",
        marginStart: 5,
    },
});

export default ThemeSelectionModal;
