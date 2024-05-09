import React from "react";
import HomeNavigation from "./home/HomeNav";
import LibraryNavigation from "./library/LibraryNav";
import UserDetailsNav from "./userDetails/UserDetailsNav";
import SearchNavigation from "./searchDetails/SearchNav";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { Image, KeyboardAvoidingView, Platform, Text } from "react-native";
function BottomTabNavigation() {
    const Tab = createBottomTabNavigator();
    const { colors, dark } = useTheme();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    tabBarStyle: {
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        elevation: 2,
                        backgroundColor: colors.background,
                        borderColor: colors.background,
                        paddingBottom: 3
                    },

                    tabBarActiveTintColor: "#0077FF",
                    tabBarInactiveTintColor: 'pink',
                    tabBarLabel: ({ focused }) => (
                        <Text style={{ fontSize: 1, color: focused ? "#0077FF" : "white" }}>
                            YourTabLabel
                        </Text>
                    ),
                    tabBarHideOnKeyboard:true
                }}
            >
                <Tab.Screen
                    name="0"
                    component={HomeNavigation}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ fontSize: 12, color: focused ? "#0077FF" : colors.text }}>
                                
                            </Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <Image source={!dark ? (!focused ? require('../assets/homeLightThemeIcon.png') : require('../assets/homeActiveIcon.png')) : (!focused ? require('../assets/homeDarkThemeIcon.png') : require('../assets/homeActiveIcon.png'))} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />

                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={SearchNavigation}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ fontSize: 12, color: focused ? "#0077FF" : colors.text }}>
                                
                            </Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <Image source={dark ? (!focused ? require('../assets/searchIconDark.png') : require('../assets/searchIconActive.png')) : (!focused ? require('../assets/searchIconLight.png') : require('../assets/searchIconActive.png'))} style={{ height: 21, width: 35, resizeMode: 'contain', marginTop: 5 }} />

                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Library"
                    component={LibraryNavigation}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ fontSize: 12, color: focused ? "#0077FF" : colors.text }}>
                                
                            </Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <Image source={dark ? (!focused ? require('../assets/libraryDarkTheme.png') : require('../assets/IconLibraryActive.png')) : (!focused ? require('../assets/LibraryLightTheme.png') : require('../assets/IconLibraryActive.png'))} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={UserDetailsNav}
                    options={{
                        tabBarLabel: ({ focused }) => (
                            <Text style={{ fontSize: 12, color: focused ? "#0077FF" : colors.text }}>
                                
                            </Text>
                        ),
                        tabBarIcon: ({ focused }) => (
                            <Image source={!dark ? (!focused ? require('../assets/userLightIcon.png') : require('../assets/userActiveIcon.png')) : (!focused ? require('../assets/userDarkIcon.png') : require('../assets/userActiveIcon.png'))} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />
                        ),
                        headerShown: false
                    }}
                />
            </Tab.Navigator>
        </KeyboardAvoidingView>
    );
}


export default BottomTabNavigation;
