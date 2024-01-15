import React, { useEffect, useState } from "react";
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import { View , Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import FollowFlatList from "./FollowFlatList";
import { useTheme } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'
import FollowingFlat from "./followingFlat";

function Following() {
    const [searchText, SetSearchText] = useState()
    const [followerArray, setFollowerArray] = useState([])
    const userEmail = useSelector((state: RootState) => {
        return state.loginAuth.email
    });
    const {colors} = useTheme()
    const [loading, setLoading] = useState(true);
    const usersCollection = firestore().collection('users');
    const userDetails = async () => {
        await usersCollection
            .where("email", "==", userEmail).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log("followerList", doc.data().following)
                    setFollowerArray(doc.data().following);
                });
            }).catch((e) => {
                console.log("error", e)
            }).finally(() => {
                setLoading(false)
            })
    };
    useEffect(() => {
        userDetails();
    }, []);
    console.log("followersArray ", followerArray)
    return (
        <View style={{ flex: 1 }}>
            <SearchBar value={searchText} onChangeText={SetSearchText} />
            {!loading ? (<FollowingFlat item={followerArray}/>) :
                (
                    <View>
                        <Text style={{textAlign:'center' , margin:10 , color:colors.text}}>Loading...</Text>
                    </View>
                )}
        </View>
    )
}
export default Following;