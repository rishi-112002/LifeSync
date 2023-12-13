import React, { useEffect, useState } from "react";
import { Image, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import storage from '@react-native-firebase/storage';
import { useNavigation } from "@react-navigation/native";
function LibrarySearchFilterView(props: { searchText: any, item: ListRenderItemInfo<never> }) {
    const [imageUrl, setImageUrl] = useState("");
    const { searchText, item } = props
    const navigation = useNavigation()
    async function getImage() {
        try {
            const storageRef = storage().ref();
            const imageRef = storageRef.child(item.item.images);
            const url = await imageRef.getDownloadURL();
            console.log("image URL ", url)
            setImageUrl(url);
        } catch (error) {
            console.error('Error getting image URL:', error);
            throw error;

        }
    }

    useEffect(() => {
        getImage();
    }, []);


    {
        if (searchText === "") {
            return (
                !!imageUrl && (
                  <View style={styles.view}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CategoryTypeScreens', {
                          categoryId: item.item.categoryId,
                          categoryName: item.item.type,
                          userId :item.item.userId
                        })
                      }
                    >
                      <Image source={{uri:imageUrl}} style={styles.image} />

                    </TouchableOpacity>
                    <Text style={styles.typeText}>{item.item.type}</Text>
                  </View>
                )
              )
        }
        if (item.item.type.toLowerCase().includes(searchText.toLowerCase())) {
            return (
                !!imageUrl && (
                  <View style={styles.view}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('CategoryTypeScreens', {
                          categoryId: item.item.categoryId,
                          categoryName: item.item.type,
                          userId :item.item.userId
                        })
                      }
                    >
                      <Image source={{uri:imageUrl}} style={styles.image} />
                    </TouchableOpacity>
                    <Text style={styles.typeText}>{item.item.type}</Text>
                  </View>
                )
              )
        }
    }
}

const styles = StyleSheet.create({
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
        color: 'black',
        marginLeft: 10,
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'auto',
        alignSelf: 'center',
        marginTop: 8
    }

})

export default LibrarySearchFilterView;