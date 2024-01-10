import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HomeFlatListView from "../../flatListComponent/HomeFlatListView";
import firestore from '@react-native-firebase/firestore'
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import GetActualTime from "../../reuseableComponent/GetActualTime";

function LikedPostScreen() {

    const navigation = useNavigation()
    const postCollection = firestore().collection('posts');
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });
    const userName = useSelector((state: RootState) => {
        return state.loginAuth.userName
    })
    const { colors,dark } = useTheme()
    const [postOption, setPostOption] = useState([])
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        postDataViaFireStore();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        postDataViaFireStore();
    }, []);

    const postDataViaFireStore = () => {
        postCollection.where("likeBy", "array-contains", userId).get()
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
    return (
        <ScrollView style={{
            backgroundColor:colors.background,
            flex: 1,
            flexDirection: 'column'
        }} contentContainerStyle={{ paddingBottom: 90 }}>
            <View style={{ flexDirection: 'row', marginTop: 13, alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")}  style={{ width: 40, height: 25, resizeMode: 'contain', marginTop: 5 , marginStart:5 }} />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 26, fontWeight: 'bold' }}>
                    Liked Posts
                </Text>
            </View>
            <FlatList data={postOption} renderItem={(item) => {
                return <HomeFlatListView item={item} />
            }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
                scrollEnabled={false} />
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column'
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
export default LikedPostScreen;