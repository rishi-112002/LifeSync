import React = require("react");
import { View, FlatList, StyleSheet } from "react-native";
import firestore from '@react-native-firebase/firestore'
import { useEffect, useState } from "react";
import LibrarySearchFilterView from "./LibrarySeachFilterView";
import { RootState } from "../reduxIntegration/Store";
import { useSelector } from "react-redux";

function LibraryFlatList(props: { searchText: String }) {
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })

    const { searchText } = props
    const categoryCollection = firestore().collection('category').where("userId", "==" , userId);
    const [categoryOption, setCategoryOption] = useState([])




    const categoryDataViaFireStore = () => {
        categoryCollection.get()
            .then((querySnapShot) => {
                const option = [];
                querySnapShot.forEach(async (doc) => {
                    const categoryData = doc.data()
                    console.log("category Id", doc.id)
                    option.push({ type: categoryData.name , images :categoryData.image , categoryId :doc.id });

                });
                setCategoryOption(option)
            })
            .catch((error) => {
                console.error("Error fetching category data:", error);
            });
    }
    useEffect(() => {
        categoryDataViaFireStore();
      console.log("category option", categoryOption);
    }, []);

    return (
        <View style={styles.container}>
            <FlatList data={categoryOption}renderItem={(item) => {
                return <LibrarySearchFilterView item={item} searchText={searchText}  />
            }} 
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
    }
    

})
export default LibraryFlatList;








