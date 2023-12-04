import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SearchScreen from './home/SearchScreen'; ``
import LibraryScreen from './library/LibraryScreen';
import UserScreen from './home/UserScreen';
import { Image, StyleSheet } from "react-native";
import HomeNavigation from "./home/HomeNav";
import LibraryNavigation from "./library/LibraryNav";

function TabNavigation() {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator style={styles.tabContainer} barStyle={styles.tabContainer} initialRouteName="Home">
            <Tab.Screen name="Home" component={HomeNavigation}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Image source={require('../assets/homeicon.png')} />
                    ),
                    tabBarColor: "white"
                }} />
            <Tab.Screen name="Search" component={SearchScreen}
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
            <Tab.Screen name="Account" component={UserScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: () => (
                        <Image source={require('../assets/accounticon.png')} />
                    ),
                }} />
        </Tab.Navigator>
    )

}
const styles = StyleSheet.create({
    tabContainer: {
        backgroundColor: 'white'
    }
})
export default TabNavigation;



1