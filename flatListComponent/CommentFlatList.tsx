import React, { useEffect, useState } from "react";
import { Image, ListRenderItemInfo, Text, TouchableOpacity, View } from "react-native";
import ModalPopUp from "../reuseableComponent/ModalPopUp";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import { useNavigation, useTheme } from "@react-navigation/native";
import storage from "@react-native-firebase/storage";

function CommentFlatList(item: ListRenderItemInfo<never>) {
    const [modalVisible, setModalVisible] = useState(false);
    const [userImage, setUserImage] = useState("")
    console.log("item details", item)
    const handlePress = () => {
        setModalVisible(true);
    };
    const {colors} = useTheme()
    const navigation = useNavigation()
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });
    async function getUserImage() {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(item.item.item.profileImage);
            const url = await imageRef.getDownloadURL();
            setUserImage(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }
    useEffect(() => {
        getUserImage();
    }, []);

    return (
        <View style={{ flexDirection: 'column', margin: 12 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                {
                    userImage &&
                    <TouchableOpacity>
                        <Image source={{ uri: userImage }} style={{ marginTop: 5, resizeMode: 'center', width: 50, height: 50, borderRadius: 30 }} />
                    </TouchableOpacity>
                }
                <View style={{ flexDirection: 'column', marginStart: 5 }}>
                    <TouchableOpacity>
                        <Text style={{ color: colors.text, marginLeft: 4, fontSize: 18 }}>
                            {item.item.item.userName}
                        </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'gray', marginLeft: 5, fontSize: 15 }}>
                        {item.item.item.createdTime}
                    </Text>
                </View>
                <TouchableOpacity onPress={handlePress} style={{ marginStart: "auto", marginEnd: 20 }}>
                    <Image source={require('../assets/threeDots.png')} />
                </TouchableOpacity>
                {item.item.item.userId === userId && modalVisible && (
                    <ModalPopUp modalVisible={modalVisible} setModalVisible={setModalVisible} navigationToScreen={() => navigation.navigate("CommentEditScreen", { postId: item.item.item.postId, commentId: item.item.item.commentId })} postId={item.item.item.postId} commentId={item.item.item.commentId} />
                )}
            </View>
            <Text style={{ color: 'gray', marginLeft: 5, fontSize: 15, marginTop: 7, backgroundColor: "#F8F8F8", width: "auto", padding: 12, borderRadius: 15, marginEnd: 15 }}>
                {item.item.item.comment}
            </Text>
        </View>
    )
}
export default CommentFlatList;