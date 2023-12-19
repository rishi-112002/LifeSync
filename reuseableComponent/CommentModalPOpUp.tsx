import React, { useState } from 'react';
import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity, Alert, TouchableWithoutFeedback } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { serverTimestamp } from '@react-native-firebase/firestore';
function CommentModal(props: { visible: any, onClose: any, postId: any, userId: any, userName: any }) {
    const [commentText, setCommentText] = useState('');
    const { visible, onClose, postId, userId, userName } = props
    const handleCancel = () => {
        setCommentText('');
        console.log("comment modal", postId, userId, userName)
        onClose();
    };

    const addCommentToFireStore = async () => {
        const commentData = {
            createdAt: serverTimestamp(),
            userName: userName,
            userId: userId,
            comment: commentText,
            postId: postId
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

        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose} accessible={false} >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>Add Comment Here</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type your comment..."
                            value={commentText}
                            multiline
                            onChangeText={setCommentText}
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleSubmit}>
                                <Text style={{ color: "white", backgroundColor: 'blue', marginStart: 'auto', fontSize: 19, fontWeight: '500', borderRadius: 10, padding: 5 }} >
                                    Submit
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleCancel}>
                                <Text style={{ color: "white", backgroundColor: 'gray', marginStart: 'auto', fontSize: 19, fontWeight: '500', borderRadius: 10, padding: 5 }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: 300,
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
