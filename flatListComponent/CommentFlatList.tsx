import React, { useState } from "react";
import { Image, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ModalPopUp from "../reuseableComponent/ModalPopUp";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
import { useNavigation } from "@react-navigation/native";

function CommentFlatList(item: ListRenderItemInfo<never>) {
    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };
    const navigation = useNavigation()
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    });
    // const [isModalVisible, setIsModalVisible] = useState(false);
    // const handleCloseModal = () => {
    //     setIsModalVisible(false);
    // };

    return (
        <View style={{ flexDirection: 'column', margin: 12 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <TouchableOpacity>
                    <Image source={require('../assets/accountImage.png')} style={{ marginTop: 5 }} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'column', marginStart: 5 }}>
                    <TouchableOpacity>
                        <Text style={{ color: 'black', marginLeft: 4, fontSize: 18 }}>
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
                    <ModalPopUp modalVisible={modalVisible} setModalVisible={setModalVisible} navigationToScreen={()=> navigation.navigate("CommentEditScreen" ,{postId:item.item.item.postId , commentId:item.item.item.commentId})} postId={item.item.item.postId} commentId={item.item.item.commentId} />
                )}
            </View>
            <Text style={{ color: 'gray', marginLeft: 5, fontSize: 15, marginTop: 7, backgroundColor: "#F8F8F8", width: "auto", padding: 12, borderRadius: 15, marginEnd: 15 }}>
                {item.item.item.comment}
            </Text>
        </View>
    )
}
export default CommentFlatList;