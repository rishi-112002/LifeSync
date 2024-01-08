import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image } from "react-native";
import HomeNavigation from "./home/HomeNav";
import LibraryNavigation from "./library/LibraryNav";
import UserDetailsNav from "./userDetails/UserDetailsNav";
import SearchNavigation from "./searchDetails/SearchNav";
import { useTheme } from "@react-navigation/native";
function TabNavigation() {

    const Tab = createMaterialBottomTabNavigator();

    const { colors, dark } = useTheme()
    return (
        <Tab.Navigator barStyle={{
            bottom: 0,
            position: "absolute",
            right: 0,
            left: 0,
            elevation: 2,
            backgroundColor: colors.background,
            borderTopWidth: 1,  // Add a top border
            borderTopColor: "lightgray",
        }} initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeNavigation}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Image source={!dark ? require('../assets/homeicon.png') : require('../assets/homeDarkTheme.png')} style={{ height: 26, width: 35, resizeMode: 'contain' }} />
                    ),
                    tabBarColor: colors.text
                }} />
            <Tab.Screen name="Search" component={SearchNavigation}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: () => (
                        <Image source={!dark ? require('../assets/search.png') : require('../assets/searchDarkTheme.png')} style={{ height: 26, width: 35, resizeMode: 'contain' }} />
                    ),
                    tabBarColor: colors.text

                }} />
            <Tab.Screen name="Library" component={LibraryNavigation}
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: () => (
                        <Image source={dark ? require('../assets/libraryDarkTheme.png') : require('../assets/LibraryLightTheme.png')} style={{ height: 26, width: 35, resizeMode: 'contain' }} />
                    ),
                    tabBarColor: colors.text
                }}

            />
            <Tab.Screen name="Account" component={UserDetailsNav}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: () => (
                        <Image source={dark ? require('../assets/userDarkTheme.png') : require('../assets/userLightTheme.png')} style={{ height: 26, width: 35, resizeMode: 'contain' }} />
                    ),
                    tabBarColor: colors.text

                }} />
        </Tab.Navigator>
    )

}
export default TabNavigation;



1