import React, { useState } from "react";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import SearchBar from "../../reuseableComponent/CustomSearchBar";
import LibraryFlatList from "../../flatListComponent/LibraryFlatList";
import { useNavigation, useTheme } from "@react-navigation/native";
import PopUpModal from "../../reuseableComponent/PopUpModal";
import { useSelector } from "react-redux";
import { RootState } from "../../reduxIntegration/Store";
import { Colors } from "react-native/Libraries/NewAppScreen";

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
    const { colors , dark} = useTheme()

    return (

        <View style={{
            flex: 1,
            backgroundColor: colors.background
        }}>
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                <Text style={{
                    color: colors.text,
                    alignContent: 'flex-start',
                    alignSelf: 'flex-start',
                    marginStart: 23,
                    marginTop: 18,
                    fontSize: 27,
                    fontWeight: 'bold'
                }}>
                    Library
                </Text>
                <TouchableOpacity onPress={togglePopupMenu} style={{ marginStart: 'auto', marginEnd: 30 }}>
                <Image source={dark ?require('../../assets/threeDotLightTheme.png'):require('../../assets/threeDotDarkTheme.png')} style={{ marginStart: "auto", marginEnd: -25  ,  resizeMode:'center' , height:35 , marginTop:20}} />

                </TouchableOpacity>

                {isPopupMenuVisible && (<PopUpModal isPopupMenuVisible={isPopupMenuVisible} togglePopupMenu={togglePopupMenu} onPress={() => {
                    navigation.navigate("AddCategory");
                    setPopupMenuVisible(false);
                }} />)
                }
            </View>
            <SearchBar value={searchText} onChangeText={setValue} />
            <LibraryFlatList searchText={searchText} userId={userId} onNavigate={() => navigation.navigate("AddCategory")} />
        </View>

    )
};
const styles = StyleSheet.create({
    tabTextColor: {

    },
    container: {

    },

})

export default LibraryScreen;