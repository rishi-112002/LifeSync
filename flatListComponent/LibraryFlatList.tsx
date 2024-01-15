import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, RefreshControl, Image, Text, TouchableOpacity } from "react-native";
import firestore from '@react-native-firebase/firestore'
import LibrarySearchFilterView from "./LibrarySeachFilterView";
import { useNavigation, useTheme } from "@react-navigation/native";

function LibraryFlatList(props: { searchText: string, userId: any, onNavigate: any }) {
    const { searchText, userId, onNavigate } = props
    const { colors , dark} = useTheme()
    const categoryCollection = firestore().collection('category').where("userId", "==", userId);
    const [categoryOption, setCategoryOption] = useState([])
    const categoryDataViaFireStore = async () => {
        try {
            const unsubscribe = categoryCollection.onSnapshot((querySnapshot) => {
                const option = [];

                querySnapshot.forEach((doc) => {
                    const categoryData = doc.data();
                    option.push({
                        type: categoryData.name,
                        images: categoryData.image,
                        categoryId: doc.id,
                        userId: userId,
                        categoryCount: querySnapshot.size
                    });
                });
                setCategoryOption(option);
            });
            return () => unsubscribe();
        } catch (error) {
            console.error("Error fetching category data:", error);
        }
    };

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("refresh is used ")
        categoryDataViaFireStore();
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);

    useEffect(() => {
        categoryDataViaFireStore();
    }, []);

    return (
        !categoryOption || categoryOption.length === 0 ?
            (
                <View style={{ marginTop: 100, alignItems: "center"  , backgroundColor:colors.background }}>
                    <TouchableOpacity onPress={onNavigate}>
                        <Image source={!dark ? require('../assets/addCategoryLightTheme.png'):require('../assets/addCategoryDarkTheme.png')} style={{ padding: 50 }} resizeMode="contain" />
                        <Text style={{ color: 'gray' }}>
                            Add  category
                        </Text>
                    </TouchableOpacity>
                </View>
            ) :
            (<View style={{
                alignItems: 'center',
                backgroundColor:colors.background
            }}>
                <FlatList
                    scrollEnabled={false}
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
