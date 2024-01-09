import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute, useTheme } from "@react-navigation/native";
import GetAllUserData from "../fireStoreHandle/GetAllUserData";
import CategoryFlatList from "./categoryFlatList";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
function CategoryTypeScreen() {
    GetAllUserData();
    const navigation = useNavigation()
    const route = useRoute();
    const data = route.params

    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })
const {colors, dark} = useTheme()
    return (
        <ScrollView style={{
            backgroundColor:colors.background,
            flex: 1
        }} contentContainerStyle={{paddingBottom:90}}>
            <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 10, marginStart: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={dark ? require("../assets/backButtonForDarkTheme.png") : require("../assets/backArrow.png")} style={{ width: 50, height: 35, resizeMode: 'center', marginEnd: 5, alignItems: 'flex-start' }} />

                </TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 27, fontWeight: 'bold', marginStart: 10, width: 250 }}>
                    {data.categoryName}
                </Text>
                {data.userId === userId && (

                    <TouchableOpacity onPress={() => navigation.navigate("AddPost")} style={{ marginStart: 'auto', marginEnd: 30 }}>
                        <Image source={require("../assets/addIcon.png")} style={{ marginTop: 3 }} />
                    </TouchableOpacity>)
                }
            </View>
            <CategoryFlatList onUserIconPress={undefined} categoryId={data.categoryId} currentUserId={data.userId} />
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    tabTextColor: {
        color: 'black',
        marginStart: 23,
        marginTop: 18,
        fontSize: 27,
        fontWeight: 'bold'
    },
})
export default CategoryTypeScreen;