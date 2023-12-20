import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import storage from "@react-native-firebase/storage";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import { useNavigation } from "@react-navigation/native";
import LibraryFlatList from "../../flatListComponent/LibraryFlatList";
import SelectProfileImagePopUp from "../../reuseableComponent/SelectProfileImagePopUp";
function UserProfileScreen() {
    const [profileImage, setProfileImage] = useState("");
    const userName = useSelector((state: RootState) => {
        return state.loginAuth.userName
    });
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });
    const imageUrl = useSelector((state: RootState) => {
        return state.allUserData.userData[userId]?.profileImage || 'DefaultName';
    })
    const navigation = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false);

    async function getImage() {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(imageUrl);
            const url = await imageRef.getDownloadURL();
            setProfileImage(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }
    useEffect(() => {
        getImage();
        console.log("profileImage", profileImage)
    }, []);
    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 50, height: 50, resizeMode: 'center', marginEnd: 5, alignItems: 'flex-start' }} />
                </TouchableOpacity>

            </View>
            <View style={style.container}>
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
                    <SelectProfileImagePopUp visible={isModalVisible} onClose={handleCloseModal} profileUri={profileImage} />
                }
                <Text style={{ color: 'black', fontSize: 27, fontWeight: 'bold', marginTop: 4 }}>
                    {userName}
                </Text>
                <View style={style.containers}>
                    <View style={style.statsContainer}>
                        <Text style={style.label}>Followers</Text>
                        <Text style={style.count}>{0}</Text>
                    </View>
                    <View style={style.statsContainer}>
                        <Text style={style.label}>Posts</Text>
                        <Text style={style.count}>{0}</Text>
                    </View>
                </View>
            </View>
            <Text style={{ color: 'black', fontSize: 27, fontWeight: 'bold', marginTop: 35, marginStart: 20 }}>
                Category List :-
            </Text>
            <LibraryFlatList searchText={" "} userId={userId} />
        </View>
    )
}

const style = StyleSheet.create({


    container: {
        alignItems: 'center',
        marginTop: 15,
        backgroundColor: 'white'
    },
    imageContainer: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
        elevation: 20,
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
    statsContainer: {
        alignItems: 'center',
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