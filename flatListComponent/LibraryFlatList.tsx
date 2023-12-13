import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import firestore from '@react-native-firebase/firestore'
import LibrarySearchFilterView from "./LibrarySeachFilterView";

function LibraryFlatList(props: { searchText: string, userId: string }) {

    const { searchText, userId } = props
    const categoryCollection = firestore().collection('category').where("userId", "==", userId);
    const [categoryOption, setCategoryOption] = useState([])

    const categoryDataViaFireStore = async () => {
        try {
            const querySnapShot = await categoryCollection.get();
            const option: ((prevState: never[]) => never[]) | { type: any; images: any; categoryId: string; userId: string; }[] = [];

            querySnapShot.forEach(async (doc) => {
                const categoryData = doc.data()
                option.push({ type: categoryData.name, images: categoryData.image, categoryId: doc.id , userId : userId});
            });

            setCategoryOption(option);
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    }
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      categoryDataViaFireStore();
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    }, []);

    useEffect(() => {
        categoryDataViaFireStore();
    }, []);
  
    return (
        categoryOption && 
       ( <View style={styles.container}>
            <FlatList
                data={categoryOption}
                renderItem={(item) => <LibrarySearchFilterView item={item} searchText={searchText} />}
                numColumns={2}
                columnWrapperStyle={styles.viewContainer}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
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
