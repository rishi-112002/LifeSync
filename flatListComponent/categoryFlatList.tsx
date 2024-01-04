import React = require("react");
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import GetActualTime from "../reuseableComponent/GetActualTime";
import HomeFlatListView from "./HomeFlatListView";

function CategoryFlatList(props: { onUserIconPress: any, categoryId: any }) {
    const { categoryId } = props
    const postCollection = firestore().collection('posts').where("categoryId", "==", categoryId);
    const [postOption, setPostOption] = useState([])
    const userName = useSelector((state: RootState) => {
        return state.loginAuth.userName
    })
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

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

    useEffect(() => {
        postDataViaFireStore();
    }, []);
    return (

        <View style={styles.container} >
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
        flexDirection: 'row',
        marginTop: 20
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})
export default CategoryFlatList;
