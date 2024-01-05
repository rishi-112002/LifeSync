import { View, Platform } from "react-native";
import React from "react";
import {
  SimpleLineIcons,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeNavigation from "./home/HomeNav";
import LibraryNavigation from "./library/LibraryNav";
import SearchNavigation from "./searchDetails/SearchNav";
import UserDetailsNav from "./userDetails/UserDetailsNav";


const Tab = createBottomTabNavigator();

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
const BottomTabNav = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <SimpleLineIcons
                name="home"
                size={24}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Messages"
        component={LibraryNavigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialCommunityIcons
                name="message-text-outline"
                size={24}
                color={focused ? "white" : "black"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Create"
        component={SearchNavigation}
        options={{
          tabBarIcon: () => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "white",
                  height: Platform.OS == "ios" ? 50 : 60,
                  width: Platform.OS == "ios" ? 50 : 60,
                  top: Platform.OS == "ios" ? -10 : -20,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                  borderWidth: 2,
                  borderColor: "white",
                }}
              >
                <Fontisto name="plus-a" size={24} color={"white"} />
              </View>
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="settings"
                size={24}
                color={focused ?  "white" : "black"}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={UserDetailsNav}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <MaterialIcons
                name="person-outline"
                size={24}
                color={focused ?  "white" : "black"}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
