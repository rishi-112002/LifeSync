import React from "react";
import HomeNavigation from "./home/HomeNav";
import LibraryNavigation from "./library/LibraryNav";
import UserDetailsNav from "./userDetails/UserDetailsNav";
import SearchNavigation from "./searchDetails/SearchNav";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '@react-navigation/native';
import { Image } from "react-native";
function BottomTabNavigation() {
    const Tab = createBottomTabNavigator();
    const { colors, dark } = useTheme();

    return (
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
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    color:colors.text
                },
                tabBarActiveTintColor: "blue",
            }}
        >
            <Tab.Screen
                name="0"
                component={HomeNavigation}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color  , focused}) => (
                        <Image source={!dark ? (!focused ? require('../assets/homeicon.png') : require('../assets/activeHomeIcon.png')) :(!focused ? require('../assets/homeDarkTheme.png') : require('../assets/activeHomeIcon.png'))} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5  }} />

                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name="Search"
                component={SearchNavigation}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color }) => (
                        <Image source={!dark ? require('../assets/search.png') : require('../assets/searchDarkTheme.png')} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />

                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name="Library"
                component={LibraryNavigation}
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: ({ color }) => (
                        <Image source={dark ? require('../assets/libraryDarkTheme.png') : require('../assets/LibraryLightTheme.png')} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />
                    ),
                    headerShown:false
                }}
            />
            <Tab.Screen
                name="Account"
                component={UserDetailsNav}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color }) => (
                        <Image source={dark ? require('../assets/userDarkTheme.png') : require('../assets/userLightTheme.png')} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />
                    ),
                    headerShown:false
                }}
            />
        </Tab.Navigator>
    );
}


export default BottomTabNavigation;
