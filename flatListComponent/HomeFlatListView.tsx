import React, { useEffect, useState } from "react";
import { Image, Linking, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import storage from '@react-native-firebase/storage';
import { useNavigation, useTheme } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore'
import ModalPopUp from "../reuseableComponent/ModalPopUp";
import LikeComment from "./LikeComment";

function HomeFlatListView(props: { item: ListRenderItemInfo<never> }) {
    const { item } = props  
    const userName = useSelector((state: RootState) => {
        return state.allUserData.userData[item.item.userId]?.name || 'DefaultName';
    })
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState("");
    const [userImage, setUserImage] = useState("")
    const [like, setLike] = useState(false);
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });
    const { colors, dark } = useTheme()

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
    const checkLikeRealtime = () => {
        const postId = item.item.postId;
        try {
            const postRef = firestore().collection("posts").doc(postId);

            const unsubscribe = postRef.onSnapshot((postDoc) => {
                if (postDoc.exists) {
                    const postData = postDoc.data();
                    const likeByArray = postData.likeBy || [];
                    const hasLiked = likeByArray.includes(userId);

                    if (hasLiked) {
                        setLike(true);
                    } else {
                        setLike(false);
                        console.log("User has already disliked the post");
                    }
                }
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };
    const imageUri = useSelector((state: RootState) => {
        console.log("userIds" , item.item.userId)
        return state.allUserData.userData[item.item.userId]?.profileImage || 'DefaultName';
    })


    useEffect(() => {
        getImage();
        checkLikeRealtime();
        getUserImage();
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
    async function getUserImage() {
        try {
            console.log("hello" , imageUri)
            const storageRef = storage().ref();
            const imageRef = storageRef.child(imageUri);
            const url = await imageRef.getDownloadURL();
            setUserImage(url);
        } catch (error) {
            console.log("hy" , )
            console.error('Error getting image URL:', error);
            throw error;
        }
    }

    // async function getUserImage() {
    //     try {
    //         const storageRef = storage().ref();
    //         const imageRef = storageRef.child(imageUri);
    //         const url = await imageRef.getDownloadURL();
    //         setUserImage(url);
    //     } catch (error) {
    //         if (error.code === 'storage/object-not-found') {
    //             // Handle the case where the image is not found.
    //             // For example, you can set a default image URL.
    //             setUserImage('URL_TO_DEFAULT_IMAGE');
    //         } else {
    //             // Handle other storage-related errors.
    //             console.error('Error getting image URL:', error);
    //             throw error;
    //         }
    //     }
    // }
    

    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    const handleLinkClick = () => {
        const url = item.item.link;
        Linking.openURL(url);
    };

    return (
        <View style={{ flexDirection: 'column', flex: 1, padding: 5 }}>
            <View style={styles.userIcon}>
                {
                    userImage &&
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userIds: item.item.userId, userNames: userName, profileUri: imageUri })}>
                        <Image source={{ uri: userImage }} style={{ marginTop: 5, resizeMode: 'center', width: 40, height: 40, borderRadius: 30 }} />
                    </TouchableOpacity>
                }
                <View style={{ flexDirection: 'column', marginEnd: 'auto', marginStart: 5, marginTop: 2 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userIds: item.item.userId, userNames: userName, profileUri: imageUri })}>
                        <Text style={{ color: colors.text, marginLeft: 4, fontSize: 18 }}>
                            {userName}
                        </Text>
                        <Text style={{ color: colors.border, marginLeft: 5, fontSize: 12 }}>
                            {item.item.timeResult}
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handlePress} style={{ paddingBottom: 20 }}>
                    <Image source={dark ? require('../assets/threeDotLightTheme.png') : require('../assets/threeDotDarkTheme.png')} style={{ marginStart: "auto", marginEnd: -20, resizeMode: 'center', height: 45 }} />
                </TouchableOpacity>
                {item.item.userId === userId && modalVisible && (
                    <ModalPopUp modalVisible={modalVisible} setModalVisible={setModalVisible} navigationToScreen={() => navigation.navigate("PostEditScreen", { postId: item.item.postId, userId: item.item.userId })} postId={item.item.postId} commentId={undefined} />
                )}
            </View>

            <View style={{ flexDirection: 'row', backgroundColor: colors.card, borderRadius: 10, marginTop: -10, padding: 7, marginEnd: 8, marginStart: 8 }}>
                {imageUrl && <TouchableOpacity>
                    <Image source={{ uri: imageUrl }} style={{ height: 80, width: 80, alignSelf: 'center', borderRadius: 10, resizeMode: 'cover' }} />
                </TouchableOpacity>}

                <View style={{ flexDirection: 'column', flex: 1 }}>
                    <TouchableOpacity>
                        <Text style={{ color: colors.text, marginLeft: 18, marginTop: 2, fontSize: 19 }}>
                            {item.item.bookName}
                        </Text>
                    </TouchableOpacity>

                    <Text style={{ color: colors.border, marginLeft: 20, fontSize: 13 }}>
                        {item.item.authorName}
                    </Text>
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleLinkClick}>
                        <Text style={{ color: colors.primary, marginLeft: 18, fontSize: 12, marginTop: 15, marginRight: 5, flex: 1 }} numberOfLines={2}>
                            {item.item.link}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <LikeComment toggleLikeButton={toggleLikeButton} like={like} item={item} navigateToScreen={() => navigation.navigate("CommentScreen", { postId: item.item.postId, userId: userId, userName: userNameCurrentUser })} postId={item.item.postId} />
            <View style={{ borderColor: colors.card, borderWidth: 0.3, borderRadius: 10, marginTop: 4 }}></View>
        </View>
    )

}

const styles = StyleSheet.create({
    userIcon: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
        marginStart: 10
    }
})
export default HomeFlatListView;