import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { serverTimestamp } from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxIntegration/Store';
import { useTheme } from '@react-navigation/native';
function CommentModal(props: { visible: any, onClose: any, postId: any, userId: any, userName: any }) {
    const [commentText, setCommentText] = useState('');
    const { visible, onClose, postId, userId, userName } = props
    const handleCancel = () => {
        setCommentText('');
        onClose();
    };
    const imageUrl = useSelector((state: RootState) => {
        return state.allUserData.userData[userId]?.profileImage || 'DefaultName';
    })
    const { colors, dark } = useTheme()
    const addCommentToFireStore = async () => {
        const commentData = {
            createdAt: serverTimestamp(),
            userName: userName,
            userId: userId,
            comment: commentText,
            postId: postId,
            profileImage: imageUrl,

        }
        firestore().collection("posts").doc(postId).collection("comments").doc().set(commentData).then(() => console.log("added successfully")).catch((Error) => console.log("error ", Error))

    }
    const handleSubmit = () => {
        if (!commentText) {
            Alert.alert("Warning ", "please write to comment")
            return
        }
        if (commentText.trim() !== '') {
            handleSubmitComment();
            setCommentText('');
            onClose();
        }
    };
    const handleSubmitComment = async () => {
        await addCommentToFireStore()
        console.log('Submitted comment:');
    };
    return (


        <TouchableWithoutFeedback onPress={onClose} accessible={false} >
            <View style={styles.modalContainer}>
                <View style={{
                    backgroundColor: colors.background,
                    padding: 20,
                    borderRadius: 10,
                    width: '100%'
                }}>

                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#ccc',
                            borderRadius: 10,
                            padding: 10,
                            marginBottom: 15,
                            height: 60,
                            color: colors.text,
                            fontSize: 16
                        }}
                        placeholder="Type your comment..."
                        value={commentText}
                        multiline
                        onChangeText={setCommentText}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleSubmit} style={{ marginStart: "auto" }}>
                            <Text style={{ color: "white", backgroundColor: 'blue', marginStart: 'auto', fontSize: 19, fontWeight: '500', borderRadius: 10, padding: 5 }} >
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: -50
    },
    modalContent: {
        backgroundColor: '',
        padding: 20,
        borderRadius: 10,
        width: '100%'
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

export default CommentModal;
