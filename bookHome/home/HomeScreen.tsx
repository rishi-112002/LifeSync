import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import HomeFlatList from "../../flatListComponent/HomeFlatList";
import { useNavigation } from "@react-navigation/native";
function HomeScreen() {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Text style={styles.tabTextColor}>
                Home
            </Text>
            <HomeFlatList  onUserIconPress ={ () => navigation.navigate('Account')}/>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    tabTextColor: {
        color: 'black',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        marginStart: 23,
        marginTop: 18,
        fontSize: 27,
        fontWeight: 'bold'
    },
})
export default HomeScreen;