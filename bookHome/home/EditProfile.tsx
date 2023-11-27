import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import firestore from '@react-native-firebase/firestore';

async function EditProfile() {
    const fireStore = firestore();
//    const collection = firestore.collection("users").get
//    console.log("collection ", collection)
   
   const querySnapshot = fireStore
   .collection('users')
   .get()
   .then(data => {
       console.log("data" , data.docs)
   })

   
    // try {
    //    firestore
    //       .collection('users')
    //       .get()
         
    // } catch (error) {
    //     console.log("error" , error)
      
    // }
  
    // return (
    //     <View>
    //         <View style={{ flexDirection: 'row', marginBottom: 40, marginTop: 20 }}>
    //             <TouchableOpacity onPress={() => navigation.navigate("Homes")}>
    //                 <Image source={require("../../assets/backArrow.png")} style={{ width: 40, height: 27, resizeMode: 'contain', marginTop: 8, marginEnd: 5 }} />
    //             </TouchableOpacity>

    //             <Text style={{ color: 'black', fontSize: 27, fontWeight: 'bold' }}>
    //                 Add Post
    //             </Text>
    //         </View>

    //     </View>
    // )

}
export default EditProfile;