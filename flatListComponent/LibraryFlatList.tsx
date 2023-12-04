import React = require("react");
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from "react";
import storage from '@react-native-firebase/storage';

function LibraryFlatList(props: { searchText: String }) {
    const { searchText } = props
    const categoryCollection = firestore().collection('category');
    const [categoryOption, setCategoryOption] = useState([])
    const [imageUrl, setImageUrl] = useState("");

    

    async function getImage(imageURL:any) {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(imageURL);
            const url = await imageRef.getDownloadURL();
            console.log("image URL ", url)
            setImageUrl(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;
        }
    }


    const filterData = (item: any) => {
        console.log("item Details", item);
        if (searchText === "") {
            return (
                <View style={styles.view}>
                    <TouchableOpacity>
                        <Image source={{ uri: imageUrl }} style={{ height:100, width: 100, alignSelf: 'center' , borderRadius:10 , resizeMode:'cover'}} />
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
                    getImage(categoryData.image)
                    console.log("category Data Image" , categoryData.image)
                    option.push({ type: categoryData.name });

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








