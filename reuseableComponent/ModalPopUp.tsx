import React from "react";
import { Text, TouchableOpacity, View , Modal, StyleSheet, Alert } from "react-native";
import deletePost from "../bookHome/home/Delete";


function ModalPopUp( props :{modalVisible:any , setModalVisible:any , navigationToScreen:any , postId:any}){
    const {modalVisible , setModalVisible , navigationToScreen , postId} = props
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
                console.log("OK button pressed");
                deletePost(postId)
              },
            },
          ],
          { cancelable: false }
        )   
        console.log('Delete button pressed');
        setModalVisible(false);
      };
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
          
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleEdit}
            >
              <Text style ={{color:'black'}}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleDelete}
            >
              <Text style ={{color:'black'}}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style ={{color:'black'}}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        flexDirection:"row",
        margin:50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
      modalContent: {
        flex:1,
        alignSelf:'center',
        textAlign:'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
      },
      modalButton: {
        backgroundColor: 'lightpink',
        padding: 10,
        textAlign:'center',
        borderColor:"gray",
        borderRadius: 5,
        borderWidth:0.5,
        marginTop: 10,
      },
})
export default ModalPopUp;