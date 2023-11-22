import React = require("react");
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from "react-native";

function LibraryFlatList(props) {
    const { renderItem } = props
    const LibraryData = [
        {
            type: "Personality Development",

            imageSrc: require('../assets/personalityimage.png'),


        },
        {
            type: "growth",
            imageSrc: require('../assets/growthImage.jpg'),

        },
        {
            type: "Habit making",
            imageSrc: require('../assets/habitMaking.png'),

        }, {
            type: "Investing",
            imageSrc: require('../assets/investingImage.jpg')
        },
        {
            type: "Fiction",
            imageSrc: require('../assets/fiction.png')
        },
        {
            type: "Non-Fiction",
            imageSrc: require('../assets/nonFiction.jpg')
        },

        {
            type: "Mystery",
            imageSrc: require('../assets/mystery.jpg')
        },
        {
            type: "Biography",
            imageSrc: require('../assets/biography.jpg')
        },
    ];
    return (
        <View style={styles.container}>
            <FlatList data={LibraryData} renderItem={(item) => {
                return (
                    <View style={styles.view}>
                        <TouchableOpacity>
                            <Image source={item.item.imageSrc} style={styles.image} />
                        </TouchableOpacity>
                        <Text style={styles.typeText}>
                            {item.item.type}
                        </Text>
                    </View>
                )
            }
            }
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
    },
    view: {
        width: "45%",
        marginBottom: 20,
        marginTop: 15
    },
    image: {
        width: 150,
        height: 120,
        borderRadius: 10
    },
    typeText: {
        color: 'gray',
        marginLeft: 10,
        fontSize: 15,
        alignSelf: 'center',
        marginTop: 8
    }

})
export default LibraryFlatList;
