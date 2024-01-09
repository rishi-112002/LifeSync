import React from "react";
import { Image } from "react-native";
import HomeNavigation from "./home/HomeNav";
import LibraryNavigation from "./library/LibraryNav";
import UserDetailsNav from "./userDetails/UserDetailsNav";
import SearchNavigation from "./searchDetails/SearchNav";
import { useTheme } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
function TabNavigation() {

    const Tab = createMaterialBottomTabNavigator();

    const { colors, dark } = useTheme()
    return (
        <Tab.Navigator barStyle={{
            bottom: -5,
            position: "absolute",
            right: 0,
            left: 0,
            elevation: 2,
            backgroundColor: colors.background,
        }} initialRouteName="Home">

            <Tab.Screen name="Home" component={HomeNavigation}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: () => (
                        <Image source={!dark ? require('../assets/homeicon.png') : require('../assets/homeDarkTheme.png')} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />
                    ),
                    tabBarColor: colors.text,

                }} />
            <Tab.Screen name="Search" component={SearchNavigation}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: () => (
                        <Image source={!dark ? require('../assets/search.png') : require('../assets/searchDarkTheme.png')} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />

                    ),
                    tabBarColor: colors.text,

                }} />
            <Tab.Screen name="Library" component={LibraryNavigation}
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: (focused) => (
                        <Image source={dark ? require('../assets/libraryDarkTheme.png') : require('../assets/LibraryLightTheme.png')} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />
                    ),
                    tabBarColor: colors.text,

                }}

            />
            <Tab.Screen name="Account" component={UserDetailsNav}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: () => (
                        <Image source={dark ? require('../assets/userDarkTheme.png') : require('../assets/userLightTheme.png')} style={{ height: 20, width: 35, resizeMode: 'contain', marginTop: 5 }} />
                    ),
                    tabBarColor: colors.text

                }} />
        </Tab.Navigator>
    )

}
export default TabNavigation;



// import type { Theme } from '../types';

// const DarkTheme: Theme = {
//   dark: true,
//   colors: {
//     primary: 'rgb(0, 122, 255)',
//     background: 'rgb(1, 1, 1)',
//     card: 'rgb(18, 18, 18)',
//     text: 'rgb(229, 229, 231)',
//     border: 'rgb(240,240,240)',
//     notification: 'rgb(245,245,245)',
//   },
// };
// export default DarkTheme;
// import type { Theme } from '../types';
// const DefaultTheme: Theme = {
//   dark: false,
//   colors: {
//     primary: 'rgb(0, 122, 255)',
//     background: 'rgb(255, 255, 255)',
//     card: 'rgb(242, 242, 242)',
//     text: 'rgb(28, 28, 30)',
//     border: 'rgb(105,105,105)',
//     notification: 'rgb(200,200,200)',
//   },
// };

// export default DefaultTheme;