import React = require("react");
import { View, FlatList, TouchableOpacity, StyleSheet, Image, Text } from "react-native";

function HomeFlatList(props) {
    const {onUserIconPress} = props
    const User = [
        {
            readerName: "",
            timeStatus:"",
            BookName :"",
            authorName:"",
            bookImage :"",
            bookLink :""
        },
        {
            readerName: "",
            timeStatus:"",
            BookName :"",
            authorName:"",
            bookImage :"",
            bookLink :""
        },
        {
            readerName: "",
            timeStatus:"",
            BookName :"",
            authorName:"",
            bookImage :"",
            bookLink :""
        },
        {
            readerName: "",
            timeStatus:"",
            BookName :"",
            authorName:"",
            bookImage :"",
            bookLink :""
        },
        {
            readerName: "",
            timeStatus:"",
            BookName :"",
            authorName:"",
            bookImage :"",
            bookLink :""
        },
        {
            readerName: "",
            timeStatus:"",
            BookName :"",
            authorName:"",
            bookImage :"",
            bookLink :""
        },
        {
            readerName: "",
            timeStatus:"",
            BookName :"",
            authorName:"",
            bookImage :"",
            bookLink :""
        }
    ];
    return (
        <View style={styles.container}>
            <FlatList data={User} renderItem={(item) => {
                return (
                    <View style={{ flexDirection: 'column', flex: 1, padding: 10 }}>
                        <View style={styles.userIcon}>
                            <TouchableOpacity onPress={onUserIconPress}>
                                <Image source={require('../assets/accountImage.png')} style={{ marginTop: 5, marginRight: 10 }} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity>
                                    <Text style={{ color: 'black', marginLeft: 10, fontSize: 18 }}>
                                        Bryan Johnson
                                    </Text>
                                </TouchableOpacity>

                                <Text style={{ color: 'gray', marginLeft: 10, fontSize: 15 }}>
                                    45 min ago
                                </Text>

                            </View>
                            <TouchableOpacity>
                                <Image source={require('../assets/threeDots.png')} style={{ marginStart: 130, marginBottom: 10 }} />
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', backgroundColor: "#F6F6F6", borderRadius: 10, marginTop: 15, padding: 12 }}>
                            <TouchableOpacity>
                                <Image source={require('../assets/bookImageA.png')} style={{ borderRadius: 10, }} />
                            </TouchableOpacity>

                            <View style={{ flexDirection: 'column', flex: 1 }}>
                                <TouchableOpacity>
                                    <Text style={{ color: 'black', marginLeft: 18, marginTop: 12, fontSize: 22 }}>
                                        Atomic Habits
                                    </Text>
                                </TouchableOpacity>

                                <Text style={{ color: 'gray', marginLeft: 20, fontSize: 15 }}>
                                    James Cleaner
                                </Text>
                                <TouchableOpacity style={{ flex: 1 }}>
                                    <Text style={{ color: 'blue', marginLeft: 18, fontSize: 13, marginTop: 20, marginRight: 5, flex: 1 }} numberOfLines={2}>
                                        https://www.amazon.in/Atomic-Habits-James-Clear...
                                    </Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    </View>
                )
            }} />
        </View>
    )
};
const styles = StyleSheet.create({
    userIcon: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginTop: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    }
})
export default HomeFlatList;
