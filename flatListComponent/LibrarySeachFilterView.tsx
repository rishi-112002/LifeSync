import React, { useEffect, useState } from "react";
import { Image, ListRenderItemInfo, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import storage from '@react-native-firebase/storage';
import { useNavigation, useTheme } from "@react-navigation/native";
function LibrarySearchFilterView(props: { searchText: any, item: ListRenderItemInfo<never> }) {
  const [imageUrl, setImageUrl] = useState("");
  const { searchText, item } = props
  const navigation = useNavigation()
  const { colors } = useTheme()

  async function getImage() {
    try {
      const storageRef = storage().ref();
      const imageRef = storageRef.child(item.item.images);
      const url = await imageRef.getDownloadURL();
      setImageUrl(url);
    } catch (error) {
      console.error('Error getting image URL:', error);
      throw error;
    }
  }
  useEffect(() => {
    getImage();
  }, [item]);

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
                  userId: item.item.userId
                })
              }
            >
              <Image source={{ uri: imageUrl }} style={styles.image} />

            </TouchableOpacity>
            <Text style={{
              color: colors.text,
              fontWeight: '500',
              flex: 1,
              padding: 5,
              fontSize: 15,
              textAlign: 'center',
              marginTop: 8
            }}>{item.item.type}</Text>
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
                  userId: item.item.userId
                })
              }
            >
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </TouchableOpacity>
            <Text style={{
              color: colors.text,
              fontWeight: '500',
              flex: 1,
              padding: 5,
              fontSize: 15,
              textAlign: 'center',
              marginTop: 8
            }}>{item.item.type}</Text>
          </View>
        )
      )
    }
  }
}

const styles = StyleSheet.create({
  view: {
    padding: 10,
    width: "48%",
    marginBottom: 20,
    marginTop: 15
  },
  image: {
    height: 100,
    borderRadius: 10
  },
})

export default LibrarySearchFilterView;