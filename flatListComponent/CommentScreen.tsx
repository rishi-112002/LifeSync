import { useNavigation, useRoute, useTheme } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import CommentModal from "../reuseableComponent/CommentModalPOpUp"
import firestore from '@react-native-firebase/firestore'
import CommentFlatList from "./CommentFlatList"
import GetActualTime from "../reuseableComponent/GetActualTime"


function CommentScreen() {
    const navigation = useNavigation()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const route = useRoute();
    const data = route.params
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };
    const [commentOption, setCommentOption] = useState([])
    const { colors, dark } = useTheme()

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };
    const commentCollection = firestore().collection('posts').doc(data["postId"]).collection("comments");
    const CommentDataViaFireStore = async () => {
        try {
            const querySnapShot = await commentCollection.get();
            const option: ((prevState: never[]) => never[]) | { comment: string; createdTime: any; userId: string; userName: string; commentId: string, postId: string, profileImage: any }[] = [];

            querySnapShot.forEach(async (doc) => {
                const commentData = doc.data()
                const result = GetActualTime(commentData.createdAt.seconds);
                option.push({ comment: commentData.comment, createdTime: result, userName: commentData.userName, userId: commentData.userId, commentId: doc.id, postId: data["postId"], profileImage: commentData.profileImage });
            });

            setCommentOption(option);
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("refresh is used ")
        CommentDataViaFireStore();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        CommentDataViaFireStore();
    }, []);

    return (
        <View style={{
            backgroundColor: colors.background,
            flex: 1,
            flexDirection: 'column'
        }}>
            <View style={{ flexDirection: 'row', marginBottom: 5, marginTop: 20, alignItems: 'flex-start' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={dark ? require("../assets/backButtonForDarkTheme.png") : require("../assets/backArrow.png")} style={{ width: 50, height: 35, resizeMode: 'center', marginEnd: 5, alignItems: 'flex-start' }} />
                </TouchableOpacity>
                <Text style={{ color: colors.text, fontSize: 27, fontWeight: 'bold' }}>
                    Comments
                </Text>
                <TouchableOpacity style={{ backgroundColor: 'green', marginStart: 'auto', borderRadius: 10, padding: 5, marginEnd: 15, marginTop: 5 }}>
                    <Text style={{ color: "white", fontSize: 19, fontWeight: '500' }} onPress={handleOpenModal}>
                        Add
                    </Text>
                </TouchableOpacity>
                {isModalVisible &&
                    <CommentModal visible={isModalVisible} onClose={handleCloseModal} postId={data["postId"]} userId={data.userId} userName={data.userName} />
                }
            </View>
            <FlatList data={commentOption} renderItem={(item) => {
                return <CommentFlatList item={item} />
            }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        flexDirection: 'column'
    },
    tabTextColor: {
        color: 'black',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        marginStart: 23,
        marginTop: 18,
        fontSize: 27,
        fontWeight: 'bold'
    },
})
export default CommentScreen;