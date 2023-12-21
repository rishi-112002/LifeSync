// Import necessary components from React Native
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet, ScrollView, View, TouchableOpacity, Image } from 'react-native';

// PrivacyPolicy component
const PrivacyPolicy = () => {
    const navigation = useNavigation()
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 50, height: 50, resizeMode: 'center', alignItems: 'flex-start', marginTop: 5 }} />
                </TouchableOpacity>

                <Text style={styles.title}>Privacy Policy</Text>
            </View>

            <Text style={styles.sectionTitle}>1. Information We Collect</Text>
            <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Presently free. But before a course, it was a trap. But not.
            </Text>

            <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
            <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                Sed cursus ante dapibus diam. Sed nisi.
            </Text>

            <Text style={styles.sectionTitle}>3. Information Sharing</Text>
            <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                Sed cursus ante dapibus diam. Sed nisi.
            </Text>

            <Text style={styles.sectionTitle}>4. Security</Text>
            <Text style={styles.paragraph}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                Sed cursus ante dapibus diam. Sed nisi.
            </Text>

            {/* Add more sections as needed */}

        </ScrollView>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "black",
        margin: 10

    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',

        color: "black",


        margin: 15
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
        color: 'black',
        margin: 15


    },
});

// Export the PrivacyPolicy component
export default PrivacyPolicy;
