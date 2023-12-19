import React from "react";
import { Text, TouchableOpacity, View, Modal, StyleSheet, Alert, TouchableWithoutFeedback } from "react-native";
import deletePost from "../bookHome/home/Delete";
import DeleteComment from "./DeleteComment";


function ModalPopUp(props: { modalVisible: any, setModalVisible: any, navigationToScreen: any, postId: any, commentId: any }) {
  const { modalVisible, setModalVisible, navigationToScreen, postId, commentId } = props
  const handleEdit = () => {
    navigationToScreen();
    console.log('Edit button pressed');
    setModalVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      "Warning",
      "Are you sure to delete your post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            console.log("OK button pressed", postId, commentId);
            if (commentId != "undefined") {
              DeleteComment(postId, commentId)
              return
            }
            else {
              deletePost(postId)
            }
          },
        },
      ],
      { cancelable: false }
    )
    console.log('Delete button pressed');
    setModalVisible(false);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)} accessible={false} >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <TouchableOpacity
              onPress={handleEdit}>
              <Text style={{
                padding: 4,
                paddingStart: 16,
                borderColor: "white",
                borderRadius: 5,
                borderWidth: 0.5,
                marginTop: 10,
                fontSize: 17,
                fontWeight: "500",
                color: 'green',
                marginStart: 5
              }}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity

              onPress={handleDelete}
            >
              <Text style={{
                // backgroundColor: 'red',
                padding: 4,
                paddingStart: 16,
                borderColor: "white",
                borderRadius: 5,
                borderWidth: 0.5,
                marginTop: 10,
                fontSize: 17,
                fontWeight: "500",
                color: 'red',
                marginStart: 5
              }}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
            >
              <Text style={{
                // backgroundColor: 'gray',
                padding: 4,
                paddingStart: 16,
                borderColor: "white",
                borderRadius: 5,
                borderWidth: 0.5,
                marginTop: 10,
                fontSize: 17,
                fontWeight: "500",
                color: 'gray',
                marginStart: 5
              }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    flexDirection: "row",
    margin: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    flex: 1,
    alignSelf: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: 'gray',
    padding: 10,
    textAlign: 'center',
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 0.5,
    marginTop: 10,
  },
})
export default ModalPopUp;