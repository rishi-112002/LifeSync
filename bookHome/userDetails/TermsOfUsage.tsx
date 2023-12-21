import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TermsOfUsageScreen = () => {
    const termsContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    // Add your terms and conditions here`;

    const navigation = useNavigation()
    return (
        <ScrollView style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 50, height: 50, resizeMode: 'center', alignItems: 'flex-start', marginTop: 5 }} />
                </TouchableOpacity>
                <Text style={styles.title}>Terms Of Usage</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.termsText}>{termsContent}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    contentContainer: {
        paddingBottom: 20, margin: 20
    },
    termsText: {
        fontSize: 16,
        color: 'black'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "black",
        margin: 10

    },
});

export default TermsOfUsageScreen;
