import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputCom from "../../reuseableComponent/TextInputComponent";
import ButtonComponent from "../../reuseableComponent/ButtonComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import storage from "@react-native-firebase/storage";
import { serverTimestamp } from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore'
import { RootState } from "../../reduxIntegration/Store";

function PostEditScreen() {
    const [bookName, setBookName] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [link, setLink] = useState("")
    const navigation = useNavigation()
    const [imageURI, setImageUri] = useState("")
    const [bnErrorMessage, setBnError] = useState("")
    const [anErrorMessage, setAnError] = useState("")
    const [linkErrorMessage, setLinkError] = useState("")
    const [selectedValue, setSelectedValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const categoryCollection = firestore().collection('category');
    const [categoryOption, setCategoryOption] = useState([])
    const route = useRoute();
    const data = route.params
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })

    console.log("data for current user ", data)

    async function getImage(uri: any) {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(uri);
            const url = await imageRef.getDownloadURL();
            setImageUri(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }


    const currentPostDataViaFireStore = async () => {
        await firestore().collection('posts').doc(data.postId).get().then((doc) => {
            if (doc.exists) {
                // const option = []
                const currentPostData = doc.data();
                setBookName(currentPostData.title);
                setAuthorName(currentPostData.subTitle);
                getImage(currentPostData.image)
                setSelectedValue(currentPostData.categoryId)
                setLink(currentPostData.link);

            } else {
                console.log('No such document!');
            }
        })

    }
    const categoryDataViaFireStore = () => {
        categoryCollection.where("userId", "==", userId).get()
            .then((querySnapShot) => {
                const option = [];
                querySnapShot.forEach((doc) => {
                    const categoryData = doc.data();
                    option.push({ label: categoryData.name, value: doc.id })
                });
                setCategoryOption(option)

            })
            .catch((error) => {
                console.error("Error fetching category data:", error);
            });
    }
    useEffect(() => {
        categoryDataViaFireStore();
        currentPostDataViaFireStore();
    }, []);

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
                setImageUri(imageUri);
            }
        });
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
            return
        }
        if (!imageURI) {
            Alert.alert("Warning", "please select a image")
            return
        }
        if (!selectedValue) {
            Alert.alert("Warning", "please select a Category")
            return
        }
        else {
            setAnError("")
            setBnError("")
            setLinkError("")
        }
        uploadPhoto();

    }
    const uploadPhoto = async () => {
        const uploadUri = imageURI
        let FileName = `PostImage/${uploadUri.substring(uploadUri.lastIndexOf('/') + 1)}`

        try {
            const reference = storage().ref(FileName)
            const task = reference.putFile(uploadUri)
            task.on('state_changed', (taskSnapshot: { bytesTransferred: any; totalBytes: any; }) => {
                console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

            })
            task.then((successfully) => {
                console.log("added", successfully)
                navigation.navigate("Homes")
            })


        } catch (error) {
            console.log("photo not uploaded", error)
        }
        addPostToFireStore(FileName);
    }

    const addPostToFireStore = async (FileName: String) => {
        const postData = {
            categoryId: selectedValue,
            createdAt: serverTimestamp(),
            image: FileName,
            link: link,
            status: "active",
            subTitle: authorName,
            title: bookName,
            updatedAt: serverTimestamp(),
            userId: userId,
        }
        firestore().collection("posts").doc(data.postId).update(postData).then(() => console.log("added successfully")).catch((Error) => console.log("error ", Error))

    }
    return (
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', backgroundColor: 'white', flex: 1 }}>
            <View style={{ flexDirection: 'row', marginBottom: 40, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 40, height: 27, resizeMode: 'contain', marginTop: 8, marginEnd: 5 }} />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 27, fontWeight: 'bold' }}>
                    Edit Post
                </Text>
            </View>
            <TextInputCom placeholder="Book Name" value={bookName} onChangeText={setBookName} secureTextEntry={false} errorMessage={bnErrorMessage} />
            <TextInputCom placeholder="Author Name" value={authorName} onChangeText={setAuthorName} secureTextEntry={false} errorMessage={anErrorMessage} />
            <TextInputCom placeholder="Link" value={link} onChangeText={setLink} secureTextEntry={false} errorMessage={linkErrorMessage} />
            <View style={{ padding: 20, marginEnd: 15 }}>
                <DropDownPicker
                    items={categoryOption}
                    open={isOpen}
                    value={selectedValue}
                    setOpen={() => setIsOpen(!isOpen)}
                    setValue={(val) => setSelectedValue(val)}
                    placeholder="Categories"
                    style={styles.dropDown}
                    maxHeight={200}
                    autoScroll
                    placeholderStyle={{ color: "black", fontWeight: 'bold', fontSize: 17 }}
                />
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
            <ButtonComponent buttonTittle="Submit" onPress={handleAddPost} />
        </View>
    )
}

const styles = StyleSheet.create({

    dropDown: {
        alignItems: 'center',
        backgroundColor: 'white',
        color: 'black'
    }
})
export default PostEditScreen;


