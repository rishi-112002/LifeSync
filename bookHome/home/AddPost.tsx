import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextInputCom from "../../reuseableComponent/TextInputComponent";
import ButtonComponent from "../../reuseableComponent/ButtonComponent";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import storage from "@react-native-firebase/storage";
import { serverTimestamp } from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";
import firestore from '@react-native-firebase/firestore'
import { RootState } from "../../reduxIntegration/Store";
import PopUpLoader from "../../reuseableComponent/PopUpLoader";
import AddCategory from "../library/AddCategory";
function AddPost() {
    const [bookName, setBookName] = useState("")
    const [authorName, setAuthorName] = useState("")
    const [link, setLink] = useState("")
    const navigation = useNavigation()
    const [imageURI, setImageUri] = useState("")
    const [selectedValue, setSelectedValue] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const categoryCollection = firestore().collection('category');
    const [categoryOption, setCategoryOption] = useState([])
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })

    const [loading, setLoading] = useState(false)
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

    const handleAddPost = async () => {

        if (!bookName) {
            Alert.alert("warning", "book name can'not be empty")
            return
        }
        if (!authorName) {
            Alert.alert("warning", "author name can'not be empty")
            return
        }

        if (!link) {
            Alert.alert("warning", "link can'not be empty")
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
        setLoading(true)
        await uploadPhoto();

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
                setLoading(false)
                addPostToFireStore(FileName);
                navigation.navigate("Homes")
            })


        } catch (error) {
            setLoading(false)
            console.log("photo not uploaded", error)
        }
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
            likeBy: [],
            likeCount: 0
        }
        firestore().collection("posts").doc().set(postData).then(() => console.log("added successfully")).catch((Error) => console.log("error ", Error))

    }
    return (

        <View style={{ flexDirection: 'column', backgroundColor: 'white', flex: 1 }} >
            <View style={{ flexDirection: 'row', marginBottom: 40, marginTop: 20 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require("../../assets/backArrow.png")} style={{ width: 40, height: 27, resizeMode: 'contain', marginTop: 8, marginEnd: 5 }} />
                </TouchableOpacity>
                <Text style={{ color: 'black', fontSize: 27, fontWeight: 'bold' }}>
                    Add Post
                </Text>
            </View>
            <TextInputCom placeholder="Book Name" value={bookName} onChangeText={setBookName} secureTextEntry={false} />
            <TextInputCom placeholder="Author Name" value={authorName} onChangeText={setAuthorName} secureTextEntry={false} />
            <TextInputCom placeholder="Link" value={link} onChangeText={setLink} secureTextEntry={false} />
            <View style={{ padding: 10, marginStart: 20, marginEnd: 20, marginTop: 5 }}>
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
                    keyboardShouldPersistTaps="handled"
                    placeholderStyle={{ color: "black", fontWeight: 'bold', fontSize: 15 }}
                    renderEmpty={() => (
                        <View>
                            <Text style={{ color: 'black' }}>No categories available</Text>
                            <TouchableOpacity onPress={() => <AddCategory />}>
                                <Text style={{ color: 'blue' }}>Add Category</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    
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
            {loading && <PopUpLoader />}
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
export default AddPost;


