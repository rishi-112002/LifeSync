import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import firestore from '@react-native-firebase/firestore'
import LibrarySearchFilterView from "./LibrarySeachFilterView";

function LibraryFlatList(props: { searchText: string, userId: string }) {

    const { searchText, userId } = props
    const categoryCollection = firestore().collection('category').where("userId", "==", userId);
    const [categoryOption, setCategoryOption] = useState([])

    const categoryDataViaFireStore = async () => {
        try {
            const querySnapShot = await categoryCollection.get();
            const option = [];

            querySnapShot.forEach(async (doc) => {
                const categoryData = doc.data()
                option.push({ type: categoryData.name, images: categoryData.image, categoryId: doc.id });
                console.log("options", option);
            });

            setCategoryOption(option);
            console.log("category option", option);
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    }

    useEffect(() => {
        categoryDataViaFireStore();
    }, []);
    console.log("categoryOption", categoryOption)
  
    return (
        categoryOption && 
       ( <View style={styles.container}>
            <FlatList
                data={categoryOption}
                renderItem={(item) => <LibrarySearchFilterView item={item} searchText={searchText} />}
                numColumns={2}
                columnWrapperStyle={styles.viewContainer}
            />
        </View>)
    )
}

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
    }
});

export default LibraryFlatList;
