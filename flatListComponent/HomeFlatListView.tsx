import React, { useEffect, useState } from "react";
import { Image, Linking, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import storage from '@react-native-firebase/storage'
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'
import ModalPopUp from "../reuseableComponent/ModalPopUp";
import LikeComment from "./LikeComment";
import LikedPostScreen from "../bookHome/userDetails/LikedPostScreen";


function HomeFlatListView(props: { item: ListRenderItemInfo<never> }) {
    const { item } = props
    const userName = useSelector((state: RootState) => {
        return state.allUserData.userData[item.item.userId]?.name || 'DefaultName';
    })

    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState("");
    const [like, setLike] = useState(false);
    const [likes, setLikes] = useState(false);


    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });

    const userNameCurrentUser = useSelector((state: RootState) => {
        return state.loginAuth.userName
    });
    const toggleLikeButton = async () => {
        setLike(!like);
        if (!like) {
            await updateLikeCount()
            return
        }
        if (like) {
            updateDislikeCount();
            return
        }

    };

    const updateLikeCount = async () => {
        const postId = item.item.postId;


        try {
            const postRef = firestore().collection("posts").doc(postId);
            const postDoc = await postRef.get();
            const postData = postDoc.data()
            const likeByArray = postDoc.exists ? (postData.likeBy || []) : [];
            const hasLiked = likeByArray.includes(userId);

            if (!hasLiked) {
                likeByArray.push(userId);

                await postRef.update({
                    likeCount: likeByArray.length,
                    likeBy: likeByArray
                });

                console.log("Like count updated successfully");
            }
            else {
                console.log("User has already liked the post");
                setLike(true)
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };

    const updateDislikeCount = async () => {
        const postId = item.item.postId;


        try {
            const postRef = firestore().collection("posts").doc(postId);
            const postDoc = await postRef.get();
            const postData = postDoc.data()
            const likeByArray = postDoc.exists ? (postData.likeBy || []) : [];
            const hasLiked = likeByArray.includes(userId);
            if (hasLiked) {
                const index = likeByArray.indexOf(userId);
                likeByArray.splice(index, 1);

                await postRef.update({
                    likeCount: likeByArray.length,
                    likeBy: likeByArray
                });
                setLike(false)
                console.log("Like count updated successfully");
            }
            else {
                setLike(false)
                console.log("User has already disliked the post");
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };



    const checkLike = async () => {
        const postId = item.item.postId;
        try {
            const postRef = firestore().collection("posts").doc(postId);
            const postDoc = await postRef.get();
            const postData = postDoc.data()
            const likeByArray = postDoc.exists ? (postData.likeBy || []) : [];
            const hasLiked = likeByArray.includes(userId);
            if (hasLiked) {
                setLike(true)
            }
            else {
                setLike(false)
                console.log("User has already disliked the post");
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };


    useEffect(() => {
        getImage();
        checkLike();
    }, []);

    async function getImage() {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(item.item.imageUri);
            const url = await imageRef.getDownloadURL();
            setImageUrl(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleLinkClick = () => {
        const url = item.item.link;
        Linking.openURL(url);
    };

    return (
        <View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
            <View style={styles.userIcon}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userIds: item.item.userId, userNames: userName })}>
                    <Image source={require('../assets/accountImage.png')} style={{ marginTop: 5, }} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userIds: item.item.userId, userNames: userName })}>
                        <Text style={{ color: 'black', marginLeft: 4, fontSize: 18 }}>
                            {userName}
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ color: 'gray', marginLeft: 5, fontSize: 15 }}>
                        {item.item.timeResult}
                    </Text>

                </View>
                <TouchableOpacity onPress={handlePress}>
                    <Image source={require('../assets/threeDots.png')} style={{ marginStart: 140 }} />
                </TouchableOpacity>
                {item.item.userId === userId && modalVisible && (
                    <ModalPopUp modalVisible={modalVisible} setModalVisible={setModalVisible} navigationToScreen={() => navigation.navigate("PostEditScreen", { postId: item.item.postId, userId: item.item.userId })} postId={item.item.postId} />
                )}
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: "#F6F6F6", borderRadius: 10, marginTop: 15, padding: 12 }}>
                {imageUrl && <TouchableOpacity>
                    <Image source={{ uri: imageUrl }} style={{ height: 100, width: 100, alignSelf: 'center', borderRadius: 10, resizeMode: 'cover' }} />
                </TouchableOpacity>}

                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'black', marginLeft: 18, marginTop: 12, fontSize: 22 }}>
                            {item.item.bookName}
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ color: 'gray', marginLeft: 20, fontSize: 15 }}>
                        {item.item.authorName}
                    </Text>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleLinkClick}>
                        <Text style={{ color: 'blue', marginLeft: 18, fontSize: 13, marginTop: 20, marginRight: 5, flex: 1 }} numberOfLines={2}>
                            {item.item.link}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <LikeComment toggleLikeButton={toggleLikeButton} like={like} item={item} navigateToScreen={() => navigation.navigate("CommentScreen", { postId: item.item.postId, userId: userId, userName: userNameCurrentUser })} />
        </View>
    )

}

const styles = StyleSheet.create({
    userIcon: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20, flex: 1,
        justifyContent: 'space-around'
    }
})
export default HomeFlatListView;