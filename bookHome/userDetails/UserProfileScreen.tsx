import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import storage from "@react-native-firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import { useNavigation, useTheme } from "@react-navigation/native";
import LibraryFlatList from "../../flatListComponent/LibraryFlatList";
import SelectProfileImagePopUp from "../../reuseableComponent/SelectProfileImagePopUp";
import firestore from '@react-native-firebase/firestore'
import Share from 'react-native-share';
import FullScreenImagePopUp from "../../reuseableComponent/FullScreenImageModalPopUp";

function UserProfileScreen() {
    const [profileImage, setProfileImage] = useState("");
    const [userName, setUserName] = useState("")
    const [followerCount, setFollowersCount] = useState("")
    const [followingCount, setFollowingCount] = useState("")
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });
    const userEmail = useSelector((state: RootState) => {
        return state.loginAuth.email
    });

    const usersCollection = firestore().collection('users');
    const userDetails = () => {
        console.log("hello user Details", userId)
        usersCollection
            .where("email", "==", userEmail).onSnapshot
            ((querySnapshot) => {
                querySnapshot.forEach(async (doc) => {
                    console.log("doc", doc._data.name)
                    const name = doc._data.name
                    setUserName(name)
                    getImage(doc._data.profileImage)
                    setFollowersCount(doc._data.follower)
                    setFollowingCount(doc._data.followingCount)
                })
            })

    };
    const { colors } = useTheme()
    const [likeCount, setLikeCount] = useState(0)
    const navigation = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false);

    async function getImage(imageUri: any) {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(imageUri);
            const url = await imageRef.getDownloadURL();
            setProfileImage(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }
    const userData = useSelector((state: RootState) => {

        return state.allUserData.userData[userId]
    })
    const postCollection = firestore().collection('posts');
    const postCount = () => {
        postCollection.where('userId', '==', userId)
            .get()
            .then((querySnapShot) => {
                const data = querySnapShot.docs.map((doc) => doc.id);
                const likeCount = data.length;
                setLikeCount(likeCount);
            })
            .catch((error) => {
                console.error("Error fetching like counts:", error);
            });
    }
    const share = async () => {
        try {
            const options = {
                title: 'BookStore App',
                message: 'Check out this awesome app!',
                url: 'https://your-app-url.com',
            };

            await Share.open(options);
        } catch (error) {
            console.log('Error sharing app:', error.message);
        }
    };
    useEffect(() => {
        userDetails();
        postCount();
    }, []);
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };
    const { dark } = useTheme()
    console.log("userName", userName)

    return (
        <ScrollView style={{ backgroundColor: colors.background, flex: 1 }} contentContainerStyle={{ paddingBottom: 90 }}>
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 10, marginStart: 10 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")} style={{ width: 40, height: 25, resizeMode: 'contain', marginEnd: 5, marginTop: 6 }} />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 25, fontWeight: 'bold' }}>
                    {userName}
                </Text>
            </View>
            <View style={{
                alignItems: 'center',
                marginTop: 5,
                backgroundColor: colors.background
            }}>
                <TouchableOpacity onPress={handleOpenModal}>
                    <View style={style.imageContainer}>
                        {profileImage ? (
                            <Image source={{ uri: profileImage }} style={style.profileImage} />
                        ) : (
                            <View style={style.placeholderContainer}>
                                <Text style={style.placeholderText}>profileImage</Text>
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
                {isModalVisible &&
                    <FullScreenImagePopUp visible={isModalVisible} onClose={handleCloseModal} profileUri={profileImage} />
                }
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 15,
                    marginStart: 12,
                    marginEnd: 14,
                    marginTop: 20,
                    justifyContent: 'space-between',
                    backgroundColor: colors.card,
                    borderRadius: 20
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate("TopBarNav", { userName: userName, followerCount: followerCount, followingCount: followingCount, routeName: "Follower" })}>
                        <View style={{ marginEnd: 20, marginStart: 8, alignItems: 'center', marginTop: -10, marginBottom: -10 }}>
                            <Text style={style.label} >Followers</Text>
                            <Text style={style.count}>{followerCount}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("TopBarNav", { userName: userName, followerCount: followerCount, followingCount: followingCount, routeName: "Following" })}>

                        <View style={{ marginEnd: 20, marginStart: 20, alignItems: 'center', marginTop: -10, marginBottom: -10 }}>
                            <Text style={style.label}>Following</Text>
                            <Text style={style.count}>{followingCount}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{ marginEnd: 8, marginStart: 20, alignItems: 'center', marginTop: -10, marginBottom: -10 }}>
                        <Text style={style.label}>Posts</Text>
                        <Text style={style.count}>{likeCount}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                <TouchableOpacity style={{ backgroundColor: colors.card, padding: 4, margin: 10, borderRadius: 10 }} onPress={() => navigation.navigate("EditUserProfile", { userEmail: userEmail, userId: userId, userName: userName, profileImage: profileImage, userData: userData })}>
                    <Text style={{ color: colors.text, fontWeight: '600', padding: 4, marginStart: 15, marginEnd: 15 }}>
                        Edit Profile
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: colors.card, padding: 4, margin: 10, borderRadius: 10, marginStart: 30 }} onPress={share}>
                    <Text style={{ color: colors.text, fontWeight: '600', padding: 4, marginStart: 15, marginEnd: 15 }}>
                        share Profile
                    </Text>
                </TouchableOpacity>
            </View>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: 'bold', marginTop: 20, marginStart: 20 }}>
                Category List :-
            </Text>
            <LibraryFlatList searchText={""} userId={userId} onNavigate={() => navigation.navigate("AddCategory")} />
        </ScrollView >
    )
}

const style = StyleSheet.create({


    container: {
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white'
    },
    imageContainer: {
        width: 110,
        height: 110,
        borderRadius: 100,
        overflow: 'hidden',
        elevation: 10,
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
    placeholderContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: 25,
        color: '#777',
    },
    containers: {
        flexDirection: 'row',
        width: 350,
        height: 80,
        alignItems: 'center',
        padding: 16,
        justifyContent: 'space-around',
        backgroundColor: '#f0f0f0',
        borderRadius: 20
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    count: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007BFF',
    },
})
export default UserProfileScreen; 