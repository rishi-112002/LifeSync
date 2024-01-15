import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Follower from './Followers';
import Following from './Following';
const Tab = createMaterialTopTabNavigator();
function TopBarNav() {
    const { colors, dark } = useTheme()
    const navigation = useNavigation()
    const route = useRoute()
    const data = route.params
    console.log("data", data)
    return (
        <View style={{ flexDirection: 'column', flex: 1, backgroundColor: colors.background }}>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, marginStart: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")} style={{ width: 40, height: 25, resizeMode: 'contain', marginEnd: 5, marginTop: 6 }} />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 25, fontWeight: 'bold' }}>
                    {data.userName}
                </Text>
            </View>
            <Tab.Navigator screenOptions={{
                tabBarStyle: {
                    position: "relative",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 2,
                    backgroundColor: colors.background,
                    borderColor: colors.background,
                    paddingBottom: 3
                },
                tabBarActiveTintColor: "#0077FF",
                tabBarInactiveTintColor: "gray",
            }}
            initialRouteName= {data.routeName} >
                <Tab.Screen  name={`${data.followerCount}    Follower`} component={Follower}/>
                <Tab.Screen  name={`${data.followingCount}    Following`}component={Following} />
            </Tab.Navigator>
        </View>
    );
}
export default TopBarNav;