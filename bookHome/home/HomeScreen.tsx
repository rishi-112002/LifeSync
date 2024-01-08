import React from "react";
import { Text, View } from 'react-native'
import HomeFlatList from "../../flatListComponent/HomeFlatList";
import { useNavigation, useTheme } from "@react-navigation/native";
import GetAllUserData from "../../fireStoreHandle/GetAllUserData";
function HomeScreen() {
    GetAllUserData();
    const { colors } = useTheme()
    const navigation = useNavigation()
    return (
        <View style={{
            backgroundColor: colors.background,
            flex: 1

        }}>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{
                    color: colors.text,
                    alignContent: 'flex-start',
                    alignSelf: 'flex-start',
                    marginStart: 23,
                    marginTop: 18,
                    fontSize: 27,
                    fontWeight: 'bold'
                }}>
                    Home
                </Text>
                <Text style={{ color: "white", backgroundColor: 'green', marginStart: 'auto', fontSize: 19, fontWeight: '500', borderRadius: 10, padding: 5, margin: 15, textAlign: 'center' }} onPress={() => navigation.navigate("AddPost")}>
                    Post
                </Text>
            </View>
            <HomeFlatList onUserIconPress={undefined} />
        </View>
    )
};
export default HomeScreen;