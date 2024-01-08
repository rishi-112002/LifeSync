import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { useTheme } from "@react-navigation/native";



function LikeComment(props: { toggleLikeButton: any, like: any, item: any, navigateToScreen: any, postId: any }) {

    const { toggleLikeButton, like, item, navigateToScreen, postId } = props
    const [commentCount, SetCommentCount] = useState(0)
    const { colors, dark } = useTheme()

    const commentCountRealtime = () => {
        try {
            const commentsRef = firestore().collection('posts').doc(postId).collection("comments");
            const unsubscribe = commentsRef.onSnapshot((querySnapshot) => {
                const commentCount = querySnapshot.docs.length;
                SetCommentCount(commentCount);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Error getting comments:", error);
        }
    };

    useEffect(() => {
        commentCountRealtime();
    }, []);
    return (
        <View style={{ marginStart: 5 }}>
            <View style={{ flexDirection: 'row', backgroundColor: colors.background, marginTop: 3, justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={toggleLikeButton}>
                    <Image source={dark ? (!like ? require('../assets/likeDarkTheme.png') : require('../assets/likedDarkTheme.png')) : (!like ? require('../assets/likeLightTheme.png') : require('../assets/likedLightTheme.png'))}
                        style={{ marginStart: 5, marginEnd: 15, marginTop: 13, width: 45, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToScreen}>
                    <Image source={!dark ? require('../assets/commentLightTheme.png') : require('../assets/commentDarkTheme.png')} style={{ marginStart: 5, marginEnd: 15, marginTop: 13, width: 40, height: 28, resizeMode: 'contain' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={!dark ? require('../assets/shareLightTheme.png') : require('../assets/shareDarkTheme.png')} style={{ marginStart: 12, marginEnd: 5, marginTop: 10, width: 40, height: 30, resizeMode: 'contain' }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: colors.background, marginTop: 2, justifyContent: 'flex-start' }}>
                <Text style={{ color: colors.text, marginStart: 14, }}>
                    {item.item.likeCount}  like
                </Text>
                <Text style={{ color: colors.text, marginStart: 16 }}>
                    {commentCount} comment
                </Text>
                <Text style={{ color: colors.text, marginStart: 15 }}>
                    share
                </Text>
            </View>
        </View>
    )
}
export default LikeComment;