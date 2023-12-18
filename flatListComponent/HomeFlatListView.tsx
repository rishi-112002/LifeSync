import React, { useEffect, useState } from "react";
import { Image, Linking, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import storage from '@react-native-firebase/storage'
import { useNavigation } from "@react-navigation/native";
import ModalPopUp from "../reuseableComponent/ModalPopUp";
function HomeFlatListView(props: { item: ListRenderItemInfo<never> }) {
    const { item } = props
    const userName = useSelector((state: RootState) => {
        return state.allUserData.userData[item.item.userId]?.name || 'DefaultName';
    })
    const navigation = useNavigation();
    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        getImage();
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
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })
    const handleLinkClick = () => {
        const url = item.item.link;  // Replace with your actual URL
        Linking.openURL(url);
    };

    return (
        <View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
            <View style={styles.userIcon}>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userIds: item.item.userId, userNames: userName })}>
                    <Image source={require('../assets/accountImage.png')} style={{ marginTop: 5,}} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userIds: item.item.userId, userNames: userName })}>
                        <Text style={{ color: 'black', marginLeft:4, fontSize: 18 }}>
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
                    <ModalPopUp modalVisible={modalVisible} setModalVisible={setModalVisible} navigationToScreen={() => navigation.navigate("PostEditScreen", { postId: item.item.postId })} />
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
        </View>
    )

}

const styles = StyleSheet.create({
    userIcon: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20, flex: 1,
        justifyContent:'space-around'
    }
})
export default HomeFlatListView;