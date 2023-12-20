import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { serverTimestamp } from '@react-native-firebase/firestore';

function CommentEditScreen() {

    const navigation = useNavigation()
    const [commentText, setCommentText] = useState("")
    const route = useRoute();
    const data = route.params
   

    const currentCommentViaFireStore = async () => {
        await firestore().collection('posts').doc(data.postId).collection("comments").doc(data.commentId).get().then((doc) => {
            if (doc.exists) {
                const currentCommentData = doc.data();
                setCommentText(currentCommentData.comment)
            } else {
                console.log('No such document!');
            }
        })

    }
    useEffect(() => {
        currentCommentViaFireStore();
    }, []);


    const addCommentToFireStore = async () => {
        const commentData = {
            createdAt: serverTimestamp(),
            comment: commentText
        }
        firestore().collection('posts').doc(data.postId).collection("comments").doc(data.commentId).update(commentData).then(() => console.log("added successfully")).catch((Error) => console.log("error ", Error))

    }
    const handleUpdateComment = () => {
        if (!commentText) {
            Alert.alert("Warning", "Please enter text to Comment")
            return
        }
        else {
            addCommentToFireStore();
            navigation.goBack();
        }
    }

    return (
        <View style={styles.modalContent}>

            <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: "row" }}>
                <Image source={require("../../assets/backArrow.png")} style={{ width: 50, height: 50, resizeMode: 'center', alignItems: 'flex-start' }} />
            </TouchableOpacity>
            <Text style={styles.modalText}>Edit Comment Here</Text>
            <TextInput
                style={styles.input}
                placeholder="Type your comment..."
                value={commentText}
                multiline
                onChangeText={setCommentText}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleUpdateComment}>
                    <Text style={{ color: "white", backgroundColor: 'blue', marginStart: 'auto', fontSize: 19, fontWeight: '500', borderRadius: 10, padding: 5 }} >
                        Submit
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={{ color: "white", backgroundColor: 'gray', marginStart: 'auto', fontSize: 19, fontWeight: '500', borderRadius: 10, padding: 5 }}>
                        Cancel
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        flex: 1,
        marginTop: 20
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        color: "black",
        fontWeight: '500'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginBottom: 15,
        height: 60,
        color: "black",
        fontSize: 16
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
export default CommentEditScreen;