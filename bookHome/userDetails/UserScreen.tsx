import React from "react";
import { Text, View } from 'react-native'
import UserFlatList from "../../flatListComponent/UserFlatList";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import { useTheme } from "@react-navigation/native";


function UserScreen({ }) {
    const userName = useSelector((state: RootState) => {
        return state.loginAuth.userName
    });
    const { colors } = useTheme()
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <Text style={{
                color: colors.text,
                alignContent: 'flex-start',
                alignSelf: 'flex-start',
                marginStart: 23,
                marginTop: 13,
                fontSize: 27,
                fontWeight: 'bold',
                marginBottom:15
            }}>
                {userName}
            </Text>
            <UserFlatList />
        </View>
    )
};
export default UserScreen;