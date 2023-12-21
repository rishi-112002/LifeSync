import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Share from 'react-native-share';
const ShareApp = () => {
    const share = async () => {
        try {
            const options = {
                title: 'Share App',
                message: 'Check out this awesome app!',
                url: 'https://your-app-url.com',
            };

            await Share.open(options);
        } catch (error) {
            console.error('Error sharing app:', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Share App</Text>
            <TouchableOpacity style={styles.shareButton}  onPress={share}>
                <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
        </View>
    );
};
export default ShareApp;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    shareButton: {
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});
