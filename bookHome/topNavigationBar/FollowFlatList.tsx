import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import firestore from '@react-native-firebase/firestore'
import FollowerFlatListView from "./FollowFlatListView";
import FollowingFlatListView from "./FollowingFlatlist";

function FollowFlatList(props: { item: any, id: any }) {
    const { item, id } = props
    const [followerData, setFollowerData] = useState([])
    const usersCollection = firestore().collection('users');
    console.log("id", id)
    const followerDetails = () => {
        if (item.length > 0) {
            usersCollection
                .where("userId", "in", item).onSnapshot
                ((querySnapshot) => {
                    const option: ((prevState: never[]) => never[]) | { name: string; profileImage: string, userId: string }[] = [];
                    querySnapshot.forEach(async (doc) => {
                        console.log("hello", doc)
                        const userData = doc._data
                        option.push({ name: userData.name, profileImage: userData.profileImage, userId: userData.userId })

                    })
                    setFollowerData(option)
                })
        }
        return
    };
    console.log(followerData)
    useEffect(() => {
        followerDetails()
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <FlatList data={followerData} renderItem={(item) => { return <FollowerFlatListView item={item} /> }} />
        </View>
    )
}
export default FollowFlatList;