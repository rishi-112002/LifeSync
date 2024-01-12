import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import firestore from '@react-native-firebase/firestore'
import FollowFlatListView from "./FollowFlatListView";

function FollowFlatList(props: { item: any}) {
    const { item } = props
    const [followerData, setFollowerData] = useState([])
    const usersCollection = firestore().collection('users');
    const followerDetails = () => {
        usersCollection
            .where("userId", "in", item).onSnapshot
            ((querySnapshot) => {
                const option: ((prevState: never[]) => never[]) | { name: string; profileImage: string , userId:string}[] = [];
                querySnapshot.forEach(async (doc) => {
                    console.log("hello", doc)
                    const userData = doc._data
                    option.push({ name: userData.name, profileImage: userData.profileImage , userId:userData.userId})

                })
                setFollowerData(option)
            })
    };
    console.log(followerData)
    useEffect(() => {
        followerDetails()
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={followerData} renderItem={(item) => { return <FollowFlatListView item={item} /> }} />
        </View>
    )
}
export default FollowFlatList;