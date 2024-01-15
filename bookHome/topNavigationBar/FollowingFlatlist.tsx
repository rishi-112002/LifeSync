import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, Alert } from "react-native";
import storage from "@react-native-firebase/storage";
import firestore from '@react-native-firebase/firestore'
import PopUpLoader from "../../reuseableComponent/PopUpLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";

function FollowingFlatListView(props: { item: any }) {
    const { colors } = useTheme()
    const navigation = useNavigation()
    const { item } = props
    const [userImage, setUserImage] = useState("")
    async function getUserImage() {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(item.item.profileImage);
            const url = await imageRef.getDownloadURL();
            setUserImage(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }
    useEffect(() => {
        getUserImage()
    }, []);
    const [loading, setLoading] = useState(false)
    const currentUserId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });

    const [follow, setFollow] = useState(false);

    const checkFollow = async (userId: any) => {
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
    const updateUnFollowing = async (userId: any) => {
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
    const updateUnFollower = async (userId: any) => {
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
                setLoading(false)

            }
            else {
                console.log("User has already UnFollowed the user");
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };


    const handleDelete = (userId: any, userNames: any) => {
        Alert.alert(
            "Warning",
            `Are you sure to unFollow ${userNames}....?`,
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        console.log("ok", userId)
                        setLoading(true)
                        await checkFollow(userId)
                        await updateUnFollowing(userId)
                        await updateUnFollower(userId)
                    },
                },
            ],
            { cancelable: false }
        )
        console.log('Delete button pressed');
    };
    return (
        <View style={{ flexDirection: 'column', marginStart: 15, marginTop: 10, marginEnd: 5 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                {
                    userImage &&
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userIds: item.item.userId, userNames: item.item.name, profileUri: item.item.profileImage })}>
                        <Image source={{ uri: userImage }} style={{ marginTop: 5, resizeMode: 'center', width: 50, height: 50, borderRadius: 30 }} />
                    </TouchableOpacity>
                }
                <TouchableOpacity style={{ marginTop: 10, marginStart: 5 }} onPress={() => navigation.navigate('ProfileScreen', { userIds: item.item.userId, userNames: item.item.name, profileUri: item.item.profileImage })}>
                    <Text style={{ color: colors.text, marginLeft: 4, fontSize: 18 }}>
                        {item.item.name}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 10, marginStart: "auto", padding: 5, marginEnd: 10 }} onPress={() => handleDelete(item.item.userId, item.item.name)}>
                    <Text style={{ color: colors.text, marginLeft: 4, fontSize: 14, backgroundColor: colors.card, borderRadius: 5, padding: 4 }}>
                        {follow ? "Follow" : "Following"}
                    </Text>
                </TouchableOpacity>
            </View>{loading &&
                <PopUpLoader />}
        </View>)
}
export default FollowingFlatListView;