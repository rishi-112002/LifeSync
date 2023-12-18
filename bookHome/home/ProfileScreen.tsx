import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LibraryFlatList from "../../flatListComponent/LibraryFlatList";


function ProfileScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const  data  = route.params
    console.log("data for profile", data)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 10, marginStart: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 40, height: 27, resizeMode: 'contain', marginTop: 8, marginEnd: 5 }} />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginStart: 10, width: 250 }}>
                    {data.userNames}
                </Text>
                <TouchableOpacity >
                    <Image source={require("../../assets/threeDots.png")} style={{ marginTop: 3 }} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20, flexDirection: "column" }}>

                <Image source={require("../../assets/backArrow.png")} style={{ width: 150, height: 100, resizeMode: 'contain', margin: 10 }} />
                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', margin: 10 }}>
                {data.userNames}

                </Text>
                <TouchableOpacity style={{ backgroundColor: "#D9D9D9", padding: 4, margin: 10, borderRadius: 10 }}>
                    <Text style={{ color: 'black', fontWeight: '600', padding: 2, marginStart: 26, marginEnd: 26 }}>
                        Follow
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', margin: 20 }}>
                Categories
            </Text>

            <LibraryFlatList searchText={" "} userId={data.userIds} />
        </View>
    )
}
export default ProfileScreen;

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