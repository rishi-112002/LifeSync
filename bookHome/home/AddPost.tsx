import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import TextInputCom from "../../reuseableComponent/TextInputComponent";
import ButtonComponent from "../../reuseableComponent/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";


function AddPost() {
    const [bookName, setBookName] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [link, setLink] = useState("")
    const navigation = useNavigation()
    const [imageURI, setImageUri] = useState("")
    const [bnErrorMessage, setBnError] = useState("")
    const [anErrorMessage, setAnError] = useState("")
    const [linkErrorMessage, setLinkError] = useState("")

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
        if (!bookName) {
            setBnError("book name can'not be empty")
            return
        }
        if (!authorName) {
            setAnError("author Name can'not be empty ")
            return
        }
        if (!link) {
            setLinkError("link can'not be empty")
        }
        else{
            setAnError("")
            setBnError("")
            setLinkError("")
        }

    }
    return (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'white', flex: 1 }}>
            <View style={{ flexDirection: 'row', marginBottom: 40, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.navigate("Homes")}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 40, height: 27, resizeMode: 'contain', marginTop: 8, marginEnd: 5 }} />
                </TouchableOpacity>

                <Text style={{ color: 'black', fontSize: 27, fontWeight: 'bold' }}>
                    Add Post
                </Text>
            </View>
            <TextInputCom placeholder="Book Name" value={bookName} onChangeText={setBookName} secureTextEntry={false} errorMessage={bnErrorMessage} />
            <TextInputCom placeholder="Author Name" value={authorName} onChangeText={setAuthorName} secureTextEntry={false} errorMessage={anErrorMessage} />
            <TextInputCom placeholder="Link" value={link} onChangeText={setLink} secureTextEntry={false} errorMessage={linkErrorMessage} />

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
            <ButtonComponent buttonTittle="Submit" onPress={handleAddPost} />
        </View>
    )
}
export default AddPost;


