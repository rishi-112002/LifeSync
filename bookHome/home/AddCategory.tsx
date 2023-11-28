import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import TextInputCom from "../../reuseableComponent/TextInputComponent";
import ButtonComponent from "../../reuseableComponent/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
function AddCategory() {
    const [categoryName, setCategoryName] = useState("")
    const [description, setDescription] = useState("")
    const navigation = useNavigation()
    const [imageURI, setImageUri] = useState("")
    const [bnErrorMessage, setBnError] = useState("")
    const [anErrorMessage, setAnError] = useState("")
    // const [uploading, setUploading] = useState(false)
    // const [transferred, setTransferred] = useState(0)
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
    const handleAddPost = () => {
        if (!categoryName) {
            setBnError("categoryName can'not be empty")
            return
        }
        if (!description) {
            setAnError("description Name can'not be empty ")
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
        uploadPhoto();

    }
    const uploadPhoto = async () => {
        const uploadUri = imageURI
        // setUploading(true)
        // setTransferred(0);
        let fileName = `CategoryImages/${uploadUri.substring(uploadUri.lastIndexOf('/') + 1)}`;
        try {
            const reference = storage().ref(fileName)
            const task = reference.putFile(uploadUri)
            task.on('state_changed', (taskSnapshot: { bytesTransferred: any; totalBytes: any; }) => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                // setTransferred(Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)
                // setUploading(false)
            })
            navigation.navigate("LibraryS")
        } catch (error) {
            console.log("photo not uploaded", error)
        }
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
                {/* {uploading && (
                    <View style = {{width :70 , height:30}}>
                        <Text style ={{color:"blue"}}> {transferred} % completed</Text>
                    <ActivityIndicator />
                    </View>
                    )
                } */}
                {imageURI && (
                    <Image source={({ uri: imageURI })} style={{ width: 140, height: 100, resizeMode: 'contain', marginStart: 80, borderRadius: 5, alignSelf: 'center', alignItems: 'center' }} />
                )
                }
            </View>
            <ButtonComponent buttonTittle="Submit" onPress={handleAddPost} />
        </View>
    )
}

export default AddCategory;

