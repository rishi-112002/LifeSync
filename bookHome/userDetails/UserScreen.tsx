import React, { useEffect, useState } from "react";
import { Text, View } from 'react-native'
import UserFlatList from "../../flatListComponent/UserFlatList";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import { useTheme } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'

function UserScreen({ }) {
    const userEmail = useSelector((state: RootState) => {
        return state.loginAuth.email
    });
    const [userName, setUserName] = useState("")
    const { colors } = useTheme()
    const usersCollection = firestore().collection('users');

    const userDetails = () => {
        usersCollection
            .where("email", "==", userEmail).onSnapshot
            ((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    console.log("doc", doc._data.name)
                    const name = doc._data.name
                    setUserName(name)
                })
            })    
    };
    useEffect(() => {
        userDetails();
    }, []);
    
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