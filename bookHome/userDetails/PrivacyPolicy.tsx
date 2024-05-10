// Import necessary components from React Native
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, ScrollView, View, TouchableOpacity, Image } from 'react-native';

// PrivacyPolicy component
const PrivacyPolicy = () => {
    const navigation = useNavigation()
    const { colors , dark} = useTheme()

    return (
        <ScrollView style={{
            backgroundColor: colors.background
        }} scrollEnabled={true} contentContainerStyle={{ paddingBottom: 90 }}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")}  style={{ width: 40, height: 25, resizeMode: 'contain', marginTop: 12 , marginStart:5 }} />
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: colors.text,
                        marginStart: 7,
                        marginTop:7

                    }}>Privacy Policy</Text>
                </View>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.text,
                    margin: 15
                }}>1. Information We Collect</Text>
                <Text style={{
                    fontSize: 16,
                    marginBottom: 12,
                    color: colors.text,
                    margin: 15
                }}>
                    We collect information you provide when using our app, including personal details, content you share, and usage data.
                </Text>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.text,
                    margin: 15
                }}>2. How We Use Your Information</Text>
                <Text style={{
                    fontSize: 16,
                    marginBottom: 12,
                    color: colors.text,
                    margin: 15
                }}>
                    We use your information to improve our app, personalize content, communicate with you, enforce policies, and analyze usage patterns.
                </Text>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.text,
                    margin: 15
                }}>3. Information Sharing</Text>
                <Text style={{
                    fontSize: 16,
                    marginBottom: 12,
                    color: colors.text,
                    margin: 15
                }}>
                    We may share your information with third parties for service provision, legal compliance, or safety reasons.
                </Text>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.text,
                    margin: 15
                }}>4. Security</Text>
                <Text style={{
                    fontSize: 16,
                    color: colors.text,
                    margin: 15
                }}>
                    We implement security measures to protect your information, but cannot guarantee absolute security.
                </Text>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.text,
                    margin: 15
                }}>4. Children Privacy</Text>
                <Text style={{
                    fontSize: 16,
                    color: colors.text,
                    margin: 15
                }}>
                     Our app is not intended for children under 13, and we do not knowingly collect their personal information.
                </Text>
                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: colors.text,
                    margin: 15
                }}>4. Contact Us</Text>
                <Text style={{
                    fontSize: 16,
                    color: colors.text,
                    margin: 15
                }}>
                   If you have questions or concerns about our privacy practices, please contact us.
                </Text>
                <Text style={{
                    fontSize: 16,
                    color: colors.text,
                    margin: 15,
                    fontWeight:'500'
                }}>
                   By using our app, you agree to the terms of this privacy policy.
                </Text>
            </View>
        </ScrollView >
    );
};
export default PrivacyPolicy;
