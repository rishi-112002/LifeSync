import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

function SearchFlatList(props: { searchText: String }) {
    const { searchText } = props
    const [bookNames, setBookNames] = useState([]);
    const { colors } = useTheme()
    const GetAllSearchData = async () => {

        const nameArray: any[] = []
        await firestore().collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const bookList = doc.data();
                nameArray.push(bookList)
            })
        })
        setBookNames(nameArray)
    }
    useEffect(() => {
        GetAllSearchData();
    }, []);
    const navigation = useNavigation()
    const filterData = (item: { description: any, name: any }) => {
        console.log("item", item)
        if (!item || searchText === "") {
            return null;
        }
        const name = item.name ? item.name.toLowerCase() : "";
        if (searchText === "") {
            return null
        }
        if (name.toLowerCase().includes(searchText.toLowerCase())) {
            return (
                <View>{item.profileImage &&
                    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userIds: item.userId, userNames: name, profileUri: item.profileImage })}>
                        <Text style={{
                            color: colors.text,
                            marginStart: 15,
                            marginTop: 10,
                            textAlign: 'left',
                            fontSize: 18,
                            flex: 1,
                            width: 320,
                            borderRadius: 5,
                            borderWidth: 1,
                            padding: 8,
                            borderBottomColor: colors.notification,
                            borderRightColor: colors.background,
                            borderTopColor: colors.background,
                            borderLeftColor: colors.background
                        }}>
                            {
                                name
                            }
                        </Text>
                    </TouchableOpacity>
                }
                </View>)
        }
        else {
            return null
        }
    }
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            marginEnd: 20,
            backgroundColor: colors.background
        }}>
            <FlatList
                data={bookNames}
                renderItem={({ item }) => filterData(item)}
                keyboardShouldPersistTaps='handled'
            />
        </View>
    )
}
export default SearchFlatList;