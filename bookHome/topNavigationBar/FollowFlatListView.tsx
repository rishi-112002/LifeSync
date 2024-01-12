import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Text, Alert } from "react-native";
import storage from "@react-native-firebase/storage";
import firestore from '@react-native-firebase/firestore'
import PopUpLoader from "../../reuseableComponent/PopUpLoader";

function FollowFlatListView(props: { item: any }) {
    const { colors, dark } = useTheme()
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
    const updateUnFollower = async (currentUserId: any) => {
        try {
            const followerRef = firestore().collection("users").doc(item.item.userId);
            const followerDoc = await followerRef.get();
            const followerData = followerDoc.data()
            const followByArray = followerDoc.exists ? (followerData.following || []) : [];
            console.log("followByArray" , followByArray , followerData)
            console.log("currentUserId",currentUserId)
            const hasFollowed = followByArray.includes(currentUserId);
            if (hasFollowed) {
                const index = followByArray.indexOf(currentUserId);
                followByArray.splice(index, 1);
                await followerRef.update({
                    follower: followByArray.length,
                    followBy: followByArray
                });
                setLoading(false)
                console.log("unFollow updated successfully");
            }
            else {
                console.log("User has already UnFollowed the user");
                setLoading(false)
                return
            }
        } catch (error) {
            console.error("Error updating like count: ", error);
        }
    };

    const handleDelete = (currentUserId: any) => {
        Alert.alert(
            "Warning",
            "Are you sure to remove ?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        console.log("ok", currentUserId)
                        setLoading(true)
                        await updateUnFollower(currentUserId)
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
                <TouchableOpacity style={{ marginTop: 10, marginStart: "auto", padding: 5, marginEnd: 5 }} onPress={() => handleDelete(item.item.userId)}>
                    <Text style={{ color: colors.text, marginLeft: 4, fontSize: 14, backgroundColor: colors.card, borderRadius: 5, padding: 4 }}>
                        remove
                    </Text>
                </TouchableOpacity>
            </View>{loading &&
                <PopUpLoader />}
        </View>)
}
export default FollowFlatListView;