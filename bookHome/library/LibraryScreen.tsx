import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import LibraryFlatList from "../../flatListComponent/LibraryFlatList";
import { useNavigation } from "@react-navigation/native";
import PopUpModal from "../../reuseableComponent/PopUpModal";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";

function LibraryScreen(this: any) {
    const navigation = useNavigation();
    const [searchText, setValue] = useState("")
    const [isPopupMenuVisible, setPopupMenuVisible] = useState(false);

    const togglePopupMenu = () => {
        setPopupMenuVisible(!isPopupMenuVisible);
        console.log("clicked menu");
    };
    const userId = useSelector((state: RootState) => {
        return state.loginAuth.userId
    })

    return (

        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={styles.tabTextColor}>
                    Library
                </Text>
                <TouchableOpacity onPress={togglePopupMenu}>
                    <Image source={require('../../assets/threeDots.png')} style={{ marginStart: 210, marginTop: 19, alignSelf: 'flex-end' }} />
                </TouchableOpacity>

                {isPopupMenuVisible && (<PopUpModal isPopupMenuVisible={isPopupMenuVisible} togglePopupMenu={togglePopupMenu} onPress={() => {
                    navigation.navigate("AddCategory");
                    setPopupMenuVisible(false);
                }} />)
                }
            </View>
            <SearchBar value={searchText} onChangeText={setValue} />
            <LibraryFlatList searchText={searchText} userId={userId} />
        </View>

    )
};
const styles = StyleSheet.create({
    tabTextColor: {
        color: 'black',
        alignContent: 'flex-start',
        alignSelf: 'flex-start',
        marginStart: 23,
        marginTop: 18,
        fontSize: 27,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

})

export default LibraryScreen;