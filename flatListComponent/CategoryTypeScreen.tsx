import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useNavigation, useRoute } from "@react-navigation/native";
import GetAllUserData from "../fireStoreHandle/GetAllUserData";
import CategoryFlatList from "./categoryFlatList";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
function CategoryTypeScreen() {
    GetAllUserData();
    const navigation = useNavigation()
    const route = useRoute();
    const  data  = route.params
  
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop:16, marginBottom:10 , marginStart:10 }}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <Image source={require("../assets/backArrow.png")} style={{ width: 40, height: 27, resizeMode: 'contain', marginTop: 8, marginEnd: 5 }} />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 27, fontWeight: 'bold' , marginStart:10, width:250}}>
                    {data.categoryName}
                </Text>
                {data.userId === userId &&(
                    
                <TouchableOpacity  onPress={()=> navigation.navigate("AddPost")}>
                    <Image source={require("../assets/addIcon.png")} style={{ marginTop:3 }} />
                </TouchableOpacity>)
                }
            </View>
            <CategoryFlatList onUserIconPress={undefined} categoryId={data.categoryId}  currentUserId ={data.userId}/>
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
export default CategoryTypeScreen;