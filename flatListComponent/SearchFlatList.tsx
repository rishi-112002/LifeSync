import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SearchFlatList(props: { searchText: String }) {
    const { searchText } = props
    const [bookNames, setBookNames] = useState([]);

    const GetAllSearchData = async () => {

        const nameArray: any[] = []
        await firestore().collection("category").get().then((querySnapshot) => {
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

    const filterData = (item: { description: any, name: any }) => {

        if (searchText === "") {
            return null
        }
        if (item.description.toLowerCase().includes(searchText.toLowerCase()) && item.name.toLowerCase().includes(searchText.toLowerCase())) {
            return (
                <View>
                    <TouchableOpacity>
                        <Text style={styles.bookList}>
                            {
                                item.description
                            }
                        </Text>
                        <Text style={styles.bookList}>
                            {
                                item.name
                            }
                        </Text>
                    </TouchableOpacity>
                </View>)
        }
        else {
            return null
        }
    }
    return (
        <View style={styles.container}>
            <FlatList
                data={bookNames}
                renderItem={({ item }) => filterData(item)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    bookList: {
        color: 'black',
        marginStart: 15,
        marginTop: 10,
        textAlign: 'left',
        fontSize: 18,
        flex: 1,
        width: 320,
        borderRadius: 5,
        borderWidth: 1,
        padding: 8,
        borderBottomColor: 'lightgrey',
        borderRightColor: 'white',
        borderTopColor: 'white',
        borderLeftColor: 'white'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
export default SearchFlatList;