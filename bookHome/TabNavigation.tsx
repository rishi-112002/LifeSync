import React from "react";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SearchScreen from './searchDetails/SearchScreen'; ``
import UserScreen from './userDetails/UserScreen';
import { Image, StyleSheet } from "react-native";
import HomeNavigation from "./home/HomeNav";
import LibraryNavigation from "./library/LibraryNav";
import UserDetailsNav from "./userDetails/UserDetailsNav";
import SearchNavigation from "./searchDetails/SearchNav";

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