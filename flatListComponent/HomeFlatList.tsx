import React = require("react");
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import HomeFlatListView from "./HomeFlatListView";
import GetActualTime from "../reuseableComponent/GetActualTime";
import GetAllUserData from "../fireStoreHandle/GetAllUserData";
import { useTheme } from "@react-navigation/native";
function HomeFlatList(_props: { onUserIconPress: any }) {
    const postCollection = firestore().collection('posts');
    const [postOption, setPostOption] = useState([])
    const userName = useSelector((state: RootState) => {
        return state.loginAuth.userName
    })
    const { colors } = useTheme()

    const postDataViaFireStore = () => {
        postCollection.get()
            .then((querySnapShot) => {
                const option: ((prevState: never[]) => never[]) | { name: string; link: any; bookName: any; authorName: any, userId: any, timeResult: any, imageUri: any, postId: any, likeCount: any, likeBy: [], userProfile: any }[] = [];
                querySnapShot.forEach(async (doc) => {
                    const postData = doc.data();
                    try {
                        const result = GetActualTime(postData.createdAt.seconds);
                        option.push({
                            name: userName, link: postData.link, bookName: postData.title, authorName: postData.subTitle,
                            userId: postData.userId, timeResult: result, imageUri: postData.image, postId: doc.id, likeBy: postData.likeBy, likeCount: postData.likeCount, userProfile: postData.profileImage
                        });
                    } catch (error) {
                        console.error("Error getting download URL:", error);
                    }
                });
                setPostOption(option)
            })
            .catch((error) => {
                console.error("Error fetching category data:", error);
            });
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        postDataViaFireStore();
        GetAllUserData();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        postDataViaFireStore();
    }, []);
    return (

        <View style={{
            flex: 1,
            backgroundColor: colors.background
        }}>

            <FlatList data={postOption} renderItem={(item) => {
                return <HomeFlatListView item={item} />
            }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } />
        </View>
    )
};
const styles = StyleSheet.create({
    userIcon: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20
    },
    container: {

    }
})
export default HomeFlatList;
