import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TermsOfUsageScreen = () => {
    const termsContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    // Add your terms and conditions here`;
    const { colors } = useTheme()
    const navigation = useNavigation()
    const {dark} = useTheme()
    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: colors.background
        }} contentContainerStyle={{ paddingBottom: 90 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")}  style={{ width: 40, height: 25, resizeMode: 'contain', marginTop: 10 , marginStart:5 }}/>
                </TouchableOpacity>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    color: colors.text,
                    marginStart: 7,
                    marginTop:6

                }}>Terms Of Usage</Text>
            </View>
            <View style={styles.contentContainer}>
                <Text style={{
                    fontSize: 16,
                    color: colors.text
                }}>{termsContent}</Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 20, margin: 20
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: "black",
        margin: 10

    },
});

export default TermsOfUsageScreen;
