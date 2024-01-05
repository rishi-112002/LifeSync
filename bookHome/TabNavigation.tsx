import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image, Platform, StyleSheet, View } from "react-native";
import HomeNavigation from "./home/HomeNav";
import LibraryNavigation from "./library/LibraryNav";
import UserDetailsNav from "./userDetails/UserDetailsNav";
import SearchNavigation from "./searchDetails/SearchNav";

function TabNavigation() {

    const Tab = createMaterialBottomTabNavigator();

    const screenOptions = {
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 60,
            backgroundColor: "white",
        },
    };
    return (
        <Tab.Navigator barStyle={styles.tabContainer} initialRouteName="Home" screenOptions={screenOptions}>
            <Tab.Screen name="Home" component={HomeNavigation}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Image source={require('../assets/homeicon.png')} />
                    ),
                    tabBarColor: "white"
                }} />
            <Tab.Screen name="Search" component={SearchNavigation}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: () => (
                        <Image source={require('../assets/search.png')} />
                    ),
                }} />
            <Tab.Screen name="Library" component={LibraryNavigation}
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: () => (
                        <Image source={require('../assets/libraryicon.png')} />
                    ),
                }} />
            <Tab.Screen name="Account" component={UserDetailsNav}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: () => (
                        <Image source={require('../assets/user.png')} />
                    ),
                }} />
        </Tab.Navigator>
    )

}
const styles = StyleSheet.create({
    tabContainer: {
        bottom: 0,
        position: "absolute",
        right: 0,
        left: 0,
        elevation: 2,
        backgroundColor: "white",
        borderTopWidth: 1,  // Add a top border
        borderTopColor: "lightgray",

    }
})
export default TabNavigation;



1