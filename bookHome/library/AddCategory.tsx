import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import TextInputCom from "../../reuseableComponent/TextInputComponent";
import ButtonComponent from "../../reuseableComponent/ButtonComponent";
import { useNavigation, useTheme } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import { serverTimestamp } from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore'
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import PopUpLoader from "../../reuseableComponent/PopUpLoader";
function AddCategory() {
    const [categoryName, setCategoryName] = useState("")
    const [description, setDescription] = useState("")
    const navigation = useNavigation()
    const [imageURI, setImageUri] = useState("")
    const [loading, setLoading] = useState(false)
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })
    const {colors , dark} = useTheme()
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

        setImageUri(imageUri)
    };
    const handleAddCategory = async () => {
        if (!categoryName) {
            Alert.alert("waning", "categoryName can not be empty")
            return
        }
        if (!description) {
            Alert.alert("waning", "description Name can not be empty ")

            return
        }
        if (!imageURI) {
            Alert.alert("Warning", "please select a image")
            return
        }
        setLoading(true)
        await uploadPhoto();

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

        await firestore().collection("category").doc().set(categoryData).then(() => console.log("added successfully")).catch((Error) => console.log("error ", Error))
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
            task.then(async (success) => {
                await createCategory(fileName)
                navigation.navigate("LibraryS")
            })
        } catch (error) {
            setLoading(false)
            console.log("photo not uploaded", error)
        }

    }
    return (
        <View style={{ flexDirection: 'column',  backgroundColor: colors.background, flex: 1 }}>
            <View style={{ flexDirection: 'row', marginBottom: 40, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate("LibraryS")}>
                <Image source={dark ? require("../../assets/backButtonForDarkTheme.png") : require("../../assets/backArrow.png")} style={{ width: 50, height: 35, resizeMode: 'center', marginEnd: 5, alignItems: 'flex-start' }} />
                </TouchableOpacity>

                <Text style={{ color: colors.text, fontSize: 27, fontWeight: 'bold' }}>
                    Add Category
                </Text>
            </View>
            <TextInputCom placeholder="Category name" value={categoryName} onChangeText={setCategoryName} secureTextEntry={false} errorMessage={""} keyBoardType={undefined} />
            <TextInputCom placeholder="Description" value={description} onChangeText={setDescription} secureTextEntry={false} errorMessage={""} keyBoardType={undefined} />
          
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
            {loading && <PopUpLoader />}
        </View>
    )
}

export default AddCategory;

