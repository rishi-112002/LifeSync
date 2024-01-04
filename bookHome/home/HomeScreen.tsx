import React from "react";
import { StyleSheet, Text, View } from 'react-native'
import HomeFlatList from "../../flatListComponent/HomeFlatList";
import { useNavigation } from "@react-navigation/native";
import GetAllUserData from "../../fireStoreHandle/GetAllUserData";
function HomeScreen() {
    GetAllUserData();
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={styles.tabTextColor}>
                    Home
                </Text>
                {/* <TouchableOpacity onPress={() => navigation.navigate("AddPost")}>
                    <Image source={require("../../assets/addIcon.png")} style={{ marginStart: 225, marginTop: 19, alignSelf: 'flex-end' }} />
                </TouchableOpacity> */}

                <Text style={{ color: "white", backgroundColor: 'green', marginStart: 'auto', fontSize: 19, fontWeight: '500', borderRadius: 10, padding: 5, margin: 15, textAlign: 'center' }} onPress={() => navigation.navigate("AddPost")}>
                    Post
                </Text>
            </View>
            <HomeFlatList onUserIconPress={undefined} />
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