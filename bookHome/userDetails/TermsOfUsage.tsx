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
            <ScrollView style={{ backgroundColor: colors.background }} scrollEnabled={true} contentContainerStyle={{ paddingBottom: 90 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")} style={{ width: 40, height: 25, resizeMode: 'contain', marginTop: 12, marginStart: 5 }} />
                        </TouchableOpacity>
    
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.text, marginStart: 7, marginTop: 7 }}>Terms of Use</Text>
                    </View>
    
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, margin: 15 }}>1. Eligibility</Text>
                    <Text style={{ fontSize: 16, marginBottom: 12, color: colors.text, margin: 15 }}>
                        You must be at least 13 years old to use the app. By using our app, you represent and warrant that you are at least 13 years old.
                    </Text>
    
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, margin: 15 }}>2. User Accounts</Text>
                    <Text style={{ fontSize: 16, marginBottom: 12, color: colors.text, margin: 15 }}>
                        You may be required to create an account to access certain features of the app. You are responsible for maintaining the confidentiality of your account credentials.
                    </Text>
    
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, margin: 15 }}>3. User Conduct</Text>
                    <Text style={{ fontSize: 16, marginBottom: 12, color: colors.text, margin: 15 }}>
                        You agree to use the app responsibly and lawfully, refraining from harmful or inappropriate behavior.
                    </Text>
    
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.text, margin: 15 }}>4. Content Ownership</Text>
                    <Text style={{ fontSize: 16, marginBottom: 12, color: colors.text, margin: 15 }}>
                        You retain ownership of the content you share, but grant us a license to use it.
                    </Text>
                    
                    {/* Add more sections as needed */}
    
                    <Text style={{ fontSize: 16, color: colors.text, margin: 15, fontWeight: '500' }}>
                        By using our app, you agree to the terms of this privacy policy.
                    </Text>
                </View>
            </ScrollView >
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
