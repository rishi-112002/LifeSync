import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import firestore from '@react-native-firebase/firestore'



function LikeComment(props: { toggleLikeButton: any, like: any, item: any, navigateToScreen: any, postId: any }) {

    const { toggleLikeButton, like, item, navigateToScreen, postId } = props
    const [commentCount, SetCommentCount] = useState(0)

    const commentCountViaFireStore = async () => {
        try {
            const querySnapshot = await firestore().collection('posts').doc(postId).collection("comments").get();
            const commentCount = querySnapshot.docs.length;
            SetCommentCount(commentCount);
        } catch (error) {
            console.error("Error getting comments:", error);
        }
    }

    useEffect(() => {
        commentCountViaFireStore();
    }, []);
    return (
        <View>
            <View style={{ flexDirection: 'row', backgroundColor: "white", marginTop: 10, alignItems: "center" }}>
                <TouchableOpacity onPress={toggleLikeButton}>
                    <Image source={!like ? require('../assets/outline_favorite_border_black_36dp.png') : require('../assets/outline_favorite_black_36dp.png')}
                        style={{ marginStart: 10, marginEnd: 10, width: 70, height: 50, resizeMode: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToScreen}>
                    <Image source={require('../assets/outline_mode_comment_black_36dp.png')} style={{ marginStart: 10, marginEnd: 10, width: 70, height: 50, resizeMode: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/outline_send_black_36dp.png')} style={{ marginStart: 10, marginEnd: 10, width: 70, height: 50, resizeMode: 'center' }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/outline_save_black_36dp.png')} style={{ marginStart: 10, marginEnd: 10, width: 70, height: 50, resizeMode: 'center' }} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: "white", marginTop: 10, alignItems: "center" }}>
                <Text style={{ color: "gray", marginStart: 25, marginEnd: 20, marginBottom: 5 }}>
                    {item.item.likeCount}  like
                </Text>
                <Text style={{ color: "gray", marginStart: 30, marginBottom: 5, marginEnd: 10 }}>
                    {commentCount} comment
                </Text>
                <Text style={{ color: "gray", marginStart: 30, marginBottom: 5, marginEnd: 25 }}>
                    share
                </Text>
                <Text style={{ color: "gray", marginStart: 30, marginBottom: 5, marginEnd: 35 }}>
                    save
                </Text>
            </View>
        </View>
    )
}
export default LikeComment;