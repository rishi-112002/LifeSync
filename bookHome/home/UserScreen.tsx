import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import UserFlatList from "../../flatListComponent/UserFlatList";

function UserScreen({}) { 
    return (
        <View style={styles.container}>
            <Text style={styles.tabTextColor}>
                Bryan Johnson
            </Text>
           <UserFlatList/>
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
        alignItems: 'center',
        backgroundColor: 'white'
    }
})

export default UserScreen;