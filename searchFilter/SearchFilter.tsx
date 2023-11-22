import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SearchFilter(props) {
    const { searchText, item } = props
    const filterData = (item: { bookName: string; }) => {
        console.log(item);
        if (searchText === "") {
            return (
                <View>

                </View>
            )
        }
        if (item.bookName.toLowerCase().includes(searchText.toLowerCase())) {
            return (
                <View>
                    <TouchableOpacity>
                        <Text style={styles.bookList}>
                            {
                                item.bookName
                            }
                        </Text>
                    </TouchableOpacity>
                </View>)
        }
    }

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
    }
})
export default SearchFilter;