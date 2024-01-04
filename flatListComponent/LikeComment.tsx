import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore'



function LikeComment(props: { toggleLikeButton: any, like: any, item: any, navigateToScreen: any, postId: any }) {

    const { toggleLikeButton, like, item, navigateToScreen, postId } = props
    const [commentCount, SetCommentCount] = useState(0)

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
            <View style={{ flexDirection: 'row', backgroundColor: "white", marginTop: 3, justifyContent: 'flex-start' }}>
                <TouchableOpacity onPress={toggleLikeButton}>
                    <Image source={!like ? require('../assets/outline_favorite_border_black_36dp.png') : require('../assets/outline_favorite_black_36dp.png')}
                        style={{ marginEnd: 5, width: 70, height: 50, resizeMode: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToScreen}>
                    <Image source={require('../assets/commentFour.png')} style={{ marginStart: 5, marginEnd: 5, width: 70, height: 50, resizeMode: "center" }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/outline_send_black_36dp.png')} style={{ marginStart: 5, marginEnd: 5, width: 70, height: 50, resizeMode: 'center' }} />
                </TouchableOpacity>

            </View>
            <View style={{ flexDirection: 'row', backgroundColor: "white", marginTop: 2, justifyContent: 'flex-start' }}>
                <Text style={{ color: "gray", marginStart: 20, }}>
                    {item.item.likeCount}  like
                </Text>
                <Text style={{ color: "gray", marginStart: 30 }}>
                    {commentCount} comment
                </Text>
                <Text style={{ color: "gray", marginStart: 25 }}>
                    share
                </Text>
            </View>
        </View>
    )
}
export default LikeComment;