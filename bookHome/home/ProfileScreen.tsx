import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LibraryFlatList from "../../flatListComponent/LibraryFlatList";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';


function ProfileScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const data = route.params
    const currentUserId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });
    const [userImage, setUserImage] = useState("")
    const userId = data.userIds;
    const [follow, setFollow] = useState(false);

    const updateFollower = async () => {
        try {
            const followerRef = firestore().collection("users").doc(userId);
            const followerDoc = await followerRef.get();
            const followerData = followerDoc.data()
            const likeByArray = followerDoc.exists ? (followerData.followBy || []) : [];
            const hasFollowed = likeByArray.includes(currentUserId);
            if (!hasFollowed) {
                likeByArray.push(currentUserId);
                await followerRef.update({
                    follower: likeByArray.length,
                    followBy: likeByArray
                });

                console.log("Like count updated successfully");
            }
            else {
                console.log("User has already liked the post");
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };
    const updateFollowing = async () => {
        try {
            const followingRef = firestore().collection("users").doc(currentUserId);
            const followingDoc = await followingRef.get();
            const followingData = followingDoc.data()
            const followingByArray = followingDoc.exists ? (followingData.following || []) : [];
            const hasFollowed = followingByArray.includes(userId);
            if (!hasFollowed) {
                followingByArray.push(userId);

                await followingRef.update({
                    followingCount: followingByArray.length,
                    following: followingByArray
                });

                console.log("Like count updated successfully");
            }
            else {
                console.log("User has already liked the post");
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };




    const checkFollow = async () => {
        try {
            const followingRef = firestore().collection("users").doc(currentUserId);
            followingRef.onSnapshot((followingDoc) => {
                const followingData = followingDoc.data();
                const followingByArray = followingDoc.exists ? (followingData.following || []) : [];
                const hasFollowed = followingByArray.includes(userId);

                setFollow(!hasFollowed);
            });
        } catch (error) {
            console.error("Error checking follow status: ", error);
        }
    };


    const updateUnFollower = async () => {
        try {
            const followerRef = firestore().collection("users").doc(userId);
            const followerDoc = await followerRef.get();
            const followerData = followerDoc.data()
            const likeByArray = followerDoc.exists ? (followerData.followBy || []) : [];
            const hasFollowed = likeByArray.includes(currentUserId);
            if (hasFollowed) {
                const index = likeByArray.indexOf(currentUserId);
                likeByArray.splice(index, 1);

                await followerRef.update({
                    follower: likeByArray.length,
                    followBy: likeByArray
                });
                console.log("unFollow updated successfully");
            }
            else {
                console.log("User has already UnFollowed the user");
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };

    const updateUnFollowing = async () => {
        try {
            const followingRef = firestore().collection("users").doc(currentUserId);
            const followingDoc = await followingRef.get();
            const followingData = followingDoc.data()
            const followingByArray = followingDoc.exists ? (followingData.following || []) : [];
            const hasFollowed = followingByArray.includes(userId);
            if (hasFollowed) {
                const index = followingByArray.indexOf(userId);
                followingByArray.splice(index, 1);

                await followingRef.update({
                    followingCount: followingByArray.length,
                    following: followingByArray
                });

                console.log("unFollowing updated successfully");
            }
            else {
                console.log("User has already unFollowing the user");
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };

    const handleFollow = async () => {
        setFollow(!follow)
        if (currentUserId != userId) {
            if (!follow) {
                await updateFollower()
                await updateFollowing()
                console.log("underFollow", follow)
                return
            }
            else {
                await updateUnFollower();
                await updateUnFollowing();
                console.log("unFollow", follow)
                return
            }

        }
    }
    async function getUserImage() {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(data.profileUri);
            const url = await imageRef.getDownloadURL();
            setUserImage(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }
    useEffect(() => {

        if (data.profileUri) {
            getUserImage();
            checkFollow()
        }
    }, []);


    console.log("current user and user", currentUserId, userId)
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 16, marginBottom: 10, marginStart: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 40, height: 27, resizeMode: 'contain', marginTop: 8, marginEnd: 5 }} />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', marginStart: 10, width: 250 }}>
                    {data.userNames}
                </Text>
                <TouchableOpacity style={{ marginStart: 'auto' ,  marginEnd:20}}>
                    <Image source={require("../../assets/threeDots.png")} style={{ marginTop: 3 }} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginTop: 20, flexDirection: "column" }}>
                <TouchableOpacity>
                    <View style={styles.imageContainer}>
                        {userImage && <Image source={{ uri: userImage }} style={styles.profileImage} />}
                    </View>
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', margin: 10 }}>
                    {data.userNames}

                </Text>
                <TouchableOpacity style={{ backgroundColor: "#D9D9D9", padding: 4, margin: 10, borderRadius: 10 }} onPress={handleFollow}>
                    <Text style={{ color: 'black', fontWeight: '600', padding: 2, marginStart: 26, marginEnd: 26 }}>
                        {follow ? "Follow" : "unFollow"}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', margin: 20 }}>
                Categories
            </Text>

            <LibraryFlatList searchText={" "} userId={data.userIds} />
        </View>
    )
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    tabTextColor: {
        color: 'black',
        marginStart: 23,
        marginTop: 18,
        fontSize: 27,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
        elevation: 20,
        shadowColor: 'gray',
        borderColor: 'gray',
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
})