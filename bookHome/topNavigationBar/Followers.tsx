import React, { useEffect, useState } from "react";
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import { View, Text } from "react-native";
import FollowFlatList from "./FollowFlatList";
import firestore from '@react-native-firebase/firestore'
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import { useTheme } from "@react-navigation/native";
import SearchFollowerFollowingFlatList from "../../flatListComponent/searchFollowerFollowingFlatlist";

function Follower() {
    const [searchText, SetSearchText] = useState("")
    const [followerArray, setFollowerArray] = useState([])
    const userEmail = useSelector((state: RootState) => {
        return state.loginAuth.email
    });
    const { colors } = useTheme()
    const [loading, setLoading] = useState(true);
    const usersCollection = firestore().collection('users');
    const userDetails = async () => {
        await usersCollection
            .where("email", "==", userEmail).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    setFollowerArray(doc.data().followBy);
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
    return (
        <View style={{ flex: 1 }}>
            <SearchBar value={searchText} onChangeText={SetSearchText} />
            {!loading ? (<FollowFlatList item={followerArray} id={true}/>) :
                (
                    <View>
                        <Text style={{ textAlign: 'center', margin: 10, color: colors.text }}>Loading...</Text>
                    </View>
                )}
            <SearchFollowerFollowingFlatList searchText={searchText} userIds={followerArray} />
        </View>
    )
}
export default Follower;