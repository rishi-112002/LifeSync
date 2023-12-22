import React, { useState } from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';

const PopUpLoader = () => {
    const [loading, setLoading] = useState(true); 
    return (

        <Modal
            transparent={true}
            animationType="slide"
            visible={loading}
            onRequestClose={() => setLoading(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        elevation: 5,
        width: 200,
    },
});

export default PopUpLoader;
