import React = require("react");
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reduxIntegration/Store";
function HomeFlatList(props: { onUserIconPress: any }) {
    const { onUserIconPress } = props
    const postCollection = firestore().collection('posts');
    const [postOption, setPostOption] = useState([])
    const userName = useSelector((state: RootState) => {
        console.log("userEmail", state)
        return state.loginAuth.userName
    })
    const postDataViaFireStore = () => {
        postCollection.get()
            .then((querySnapShot) => {
                const option = [];
                querySnapShot.forEach(async (doc) => {
                    console.log("id", doc.id);
                    const postData = doc.data();
                    console.log("category Data", postData.name);
                    try {
                        // const storageRef = storage().ref();
                        // const fileRef = storageRef.child(postData.image);
                        // const url = await fileRef.getDownloadURL();
                        option.push({ name : userName ,link : postData.link, bookName: postData.title , authorName:postData.subTitle});
                    } catch (error) {
                        console.error("Error getting download URL:", error);
                    }
                });
                setPostOption(option)
            })
            .catch((error) => {
                console.error("Error fetching category data:", error);
            });
    }
    useEffect(() => {
        postDataViaFireStore();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList data={postOption} renderItem={(item) => {
                return (
                    <View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
                        <View style={styles.userIcon}>
                            <TouchableOpacity onPress={onUserIconPress}>
                                <Image source={require('../assets/accountImage.png')} style={{ marginTop: 5, marginRight: 10 }} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity>
                                    <Text style={{ color: 'black', marginLeft: 10, fontSize: 18 }}>
                                       {item.item.name}
                                    </Text>
                                </TouchableOpacity>

                                <Text style={{ color: 'gray', marginLeft: 10, fontSize: 15 }}>
                                    45 min ago
                                </Text>

                            </View>
                            <TouchableOpacity>
                                <Image source={require('../assets/threeDots.png')} style={{ marginStart: 130, marginBottom: 10 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', backgroundColor: "#F6F6F6", borderRadius: 10, marginTop: 15, padding: 12 }}>
                            <TouchableOpacity>
                                <Image source={require('../assets/bookImageA.png')} style={{ borderRadius: 10, }} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <TouchableOpacity>
                                    <Text style={{ color: 'black', marginLeft: 18, marginTop: 12, fontSize: 22 }}>
                                        {item.item.bookName}
                                    </Text>
                                </TouchableOpacity>

                                <Text style={{ color: 'gray', marginLeft: 20, fontSize: 15 }}>
                                    {item.item.authorName}
                                </Text>
                                <TouchableOpacity style={{ flex: 1 }}>
                                    <Text style={{ color: 'blue', marginLeft: 18, fontSize: 13, marginTop: 20, marginRight: 5, flex: 1 }} numberOfLines={2}>
                                        {item.item.link}
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                )
            }} />
        </View>
    )
};
const styles = StyleSheet.create({
    userIcon: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
export default HomeFlatList;
