import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import UserFlatList from "../../flatListComponent/UserFlatList";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";

function UserScreen({ }) {
    const userName = useSelector((state: RootState) => {
        return state.loginAuth.userName
    });
    return (
        <View style={styles.container}>
            <Text style={styles.tabTextColor}>
                {userName}
            </Text>
            <UserFlatList />
        </View>
    )
};

const styles = StyleSheet.create({
    tabTextColor: {
        color: 'black',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        marginStart: 23,
        marginBottom: 50,
        marginTop: 18,
        fontSize: 27,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})

export default UserScreen;