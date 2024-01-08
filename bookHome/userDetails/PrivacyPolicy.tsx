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
                        <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")} style={{ width: 50, height: 50, resizeMode: 'center', alignItems: 'flex-start', marginTop: 5 }} />
                    </TouchableOpacity>

                    <Text style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        color: colors.text,
                        margin: 10

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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Presently free. But before a course, it was a trap. But not.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                    Sed cursus ante dapibus diam. Sed nisi.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                    Sed cursus ante dapibus diam. Sed nisi.
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                    Sed cursus ante dapibus diam. Sed nisi.
                    arevfevfvf
                    vdvfewvv
                </Text>
            </View>
        </ScrollView >
    );
};
export default PrivacyPolicy;
