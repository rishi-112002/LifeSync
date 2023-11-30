import React = require("react");
import { View, FlatList, StyleSheet } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import HomeFlatListView from "./HomeFlatListView";
function HomeFlatList(props: { onUserIconPress: any }) {
    const { onUserIconPress } = props
    const postCollection = firestore().collection('posts');
    const [postOption, setPostOption] = useState([])
    const [userIds, setUserIds] = useState()
    const userName = useSelector((state: RootState) => {
        console.log("userEmail", state)
        return state.loginAuth.userName
    })

    // console.log("userNames",userNames)
    const postDataViaFireStore = () => {
        postCollection.get()
            .then((querySnapShot) => {
                const option: ((prevState: never[]) => never[]) | { name: string; link: any; bookName: any; authorName: any, userId: any }[] = [];
                querySnapShot.forEach(async (doc) => {
                    const postData = doc.data();
                    try {
                        // const storageRef = storage().ref();
                        // const fileRef = storageRef.child(postData.image);
                        // const url = await fileRef.getDownloadURL();
                        // userNames[doc.id]
                        setUserIds(postData.userId)
                        option.push({
                            name: userName, link: postData.link, bookName: postData.title, authorName: postData.subTitle,
                            userId: postData.userId
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
    console.log("Post Options", postOption)
    return (

        <View style={styles.container}>
            <FlatList data={postOption} renderItem={(item) => {
                return <HomeFlatListView item={item} onUserIconPress={onUserIconPress}  />
            }} />
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
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
export default HomeFlatList;
