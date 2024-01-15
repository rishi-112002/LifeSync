import React, { useState, useEffect } from "react";
import firestore from '@react-native-firebase/firestore';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";

function SearchFollowerFollowingFlatList(props: { searchText: String  , userIds:[]}) {
    const { searchText  , userIds} = props
    const [userName, setUserNames] = useState([]);
    const { colors } = useTheme()
    const GetAllSearchData = async () => {
        firestore().collection("users").where("userId", "==", userIds).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const userList = doc.data();
                setUserNames(userList)
            });
        })   
    }

    useEffect(() => {
        GetAllSearchData();
    }, []);
    const navigation = useNavigation()
    const filterData = (item: { description: any, name: any }) => {
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
                data={userName}
                renderItem={({ item }) => filterData(item)}
                keyboardShouldPersistTaps='handled'
            />
        </View>
    )
}
export default SearchFollowerFollowingFlatList;