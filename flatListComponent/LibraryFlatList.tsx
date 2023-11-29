import React = require("react");
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from "react";
import storage from '@react-native-firebase/storage';
function LibraryFlatList(props: { searchText: String }) {
    const { searchText } = props
    const categoryCollection = firestore().collection('category');
    const [categoryOption, setCategoryOption] = useState([])
    const staticUrl = "https://firebasestorage.googleapis.com/v0/b/react-native-training-ad249.appspot.com/o/"
    const filterData = (item) => {
        console.log("item Details",item);
        if (searchText === "") {
            return (
                <View style={styles.view}>
                    <TouchableOpacity>
                        <Image source={{ uri: item.imageSrc }} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.typeText}>
                        {item.type}
                    </Text>
                </View>
            )
        }
        if (item.type.toLowerCase().includes(searchText.toLowerCase())) {
            return (
                <View style={styles.view}>
                    <TouchableOpacity>
                        <Image source={{ uri: item.imageSrc }} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.typeText}>
                        {item.type}
                    </Text>
                </View>
            )
        }
    }

    const categoryDataViaFireStore = () => {
        categoryCollection.get()
            .then((querySnapShot) => {
                const option = [];
                querySnapShot.forEach(async (doc) => {
                    console.log("id", doc.id);
                    const categoryData = doc.data();
                    console.log("category Data", categoryData.name);
                    try {
                        const storageRef = storage().ref();
                        const fileRef = storageRef.child(categoryData.image);
                        const url = await fileRef.getDownloadURL();
                        option.push({ type: categoryData.name, imageSrc: url });
                    } catch (error) {
                        console.error("Error getting download URL:", error);
                    }
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

    return (
        <View style={styles.container}>
            <FlatList data={categoryOption} renderItem={({ item }) => filterData(item)}
                numColumns={2}
                columnWrapperStyle={styles.viewContainer} />
        </View>
    )
};
const styles = StyleSheet.create({
    userIcon: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20,
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    viewContainer: {
        justifyContent: "space-between",
    },
    view: {
        width: "45%",
        marginBottom: 20,
        marginTop: 15
    },
    image: {
        width: 150,
        height: 120,
        borderRadius: 10
    },
    typeText: {
        color: 'gray',
        marginLeft: 10,
        fontSize: 15,
        textAlign: 'auto',
        alignSelf: 'center',
        marginTop: 8
    }

})
export default LibraryFlatList;








