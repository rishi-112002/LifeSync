import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from "react-native";
import TextInputCom from "../../reuseableComponent/TextInputComponent";
import ButtonComponent from "../../reuseableComponent/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { serverTimestamp } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore'
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
function AddCategory() {
    const [categoryName, setCategoryName] = useState("")
    const [description, setDescription] = useState("")
    const navigation = useNavigation()
    const [imageURI, setImageUri] = useState("")
    const [bnErrorMessage, setBnError] = useState("")
    const [anErrorMessage, setAnError] = useState("")
    const [loading , setLoading] = useState(false)
    const userId = useSelector((state: RootState) => {
        console.log("userEmail", state)
        return state.loginAuth.userId
    })
    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('Image picker error: ', response.errorMessage);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
            }
        });
    };
    const setSelectedImage = (imageUri: any) => {
        console.log('Selected Image URI:', imageUri);
        setImageUri(imageUri)
    };
    const handleAddCategory = () => {
        if (!categoryName) {
            setBnError("categoryName can'not be empty")
            Alert.alert("waning" ,"categoryName can'not be empty" )
            return
        }
        if (!description) {
            setAnError("description Name can'not be empty ")
            Alert.alert("waning" ,"description Name can'not be empty " )

            return
        }
        if (!imageURI) {
            Alert.alert("Warning", "please select a image")
            return
        }
        else {
            setAnError("")
            setBnError("")
        }
        setLoading(true)
        uploadPhoto();

    }
    const createCategory = async (FileName: String) => {
        const categoryData = {
            createdAt: serverTimestamp(),
            description: description,
            image: FileName,
            name: categoryName,
            status: "active",
            updatedAt: serverTimestamp(),
            userId: userId,
        }
        console.log("Post Data", categoryData)
      await  firestore().collection("category").doc().set(categoryData).then(() => console.log("added successfully")).catch((Error) => console.log("error ", Error))
    }
    const uploadPhoto = async () => {
        const uploadUri = imageURI
        let fileName = `CategoryImages/${uploadUri.substring(uploadUri.lastIndexOf('/') + 1)}`;
        try {
            const reference = storage().ref(fileName)
            const task = reference.putFile(uploadUri)
            task.on('state_changed', (taskSnapshot: { bytesTransferred: any; totalBytes: any; }) => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            })
            navigation.navigate("LibraryS")
        } catch (error) {
            setLoading(false)
            console.log("photo not uploaded", error)
        }
        createCategory(fileName)
    }
    return (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'white', flex: 1 }}>
            <View style={{ flexDirection: 'row', marginBottom: 40, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate("LibraryS")}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 40, height: 27, resizeMode: 'contain', marginTop: 8, marginEnd: 5 }} />
                </TouchableOpacity>

                <Text style={{ color: 'black', fontSize: 27, fontWeight: 'bold' }}>
                    Add Category
                </Text>
            </View>
            <TextInputCom placeholder="Category name" value={categoryName} onChangeText={setCategoryName} secureTextEntry={false} errorMessage={bnErrorMessage} />
            <TextInputCom placeholder="Description" value={description} onChangeText={setDescription} secureTextEntry={false} errorMessage={anErrorMessage} />
            <View style={{ padding: 20, marginEnd: 15 }}>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <TouchableOpacity onPress={() => openImagePicker()} >
                    <Text style={{ color: 'blue', fontSize: 15, fontWeight: 'bold', marginTop: 15, marginStart: 35, marginBottom: 20 }}>
                        {imageURI ? "change Image" : "add image"}
                    </Text>
                </TouchableOpacity>
            
                {imageURI && (
                    <Image source={({ uri: imageURI })} style={{ width: 140, height: 100, resizeMode: 'contain', marginStart: 80, borderRadius: 5, alignSelf: 'center', alignItems: 'center' }} />
                )
                }
            </View>
            <ButtonComponent buttonTittle="Submit" onPress={handleAddCategory} />
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    )
}

export default AddCategory;

