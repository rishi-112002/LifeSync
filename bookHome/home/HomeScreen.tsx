import React from "react";
import { Animated, Text, View } from 'react-native'
import HomeFlatList from "../../flatListComponent/HomeFlatList";
import { useNavigation, useTheme } from "@react-navigation/native";
import GetAllUserData from "../../fireStoreHandle/GetAllUserData";
function HomeScreen() {
    GetAllUserData();
    const { colors } = useTheme()
    const navigation = useNavigation()
    const scrollY = new Animated.Value(0)
    const diffClamp = Animated.diffClamp(scrollY, 0, 45)
    const translateY = diffClamp.interpolate({
        inputRange: [0, 45],
        outputRange: [0, -45]
    })
    return (
        <View style={{
            backgroundColor: colors.background,
            flex: 1
        }} >
            <Animated.View
                style={{
                    transform: [
                        { translateY: translateY }
                    ],
                    elevation: 1,
                    zIndex: 100,
                }}
            >
                <View style={{
                    // marginTop:Constant.statusBarHeight,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 45,
                    elevation: 4,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    backgroundColor: colors.background
                }}>
                    <Text style={{
                        color: colors.text,
                        marginStart: 24,
                        marginTop: 17,
                        fontSize: 27,
                        fontWeight: 'bold',
                        marginEnd: 'auto'
                    }}>
                        Home
                    </Text>
                    <Text style={{ color: "white", backgroundColor: 'green', fontSize: 15, fontWeight: '500', borderRadius: 10, padding: 4, textAlign: 'center', marginTop: 19, marginEnd: 8 }} onPress={() => navigation.navigate("AddPost")}>
                        Post
                    </Text>
                </View>
            </Animated.View>
            {/* <View style={{ marginBottom: 40, backgroundColor: 'rgba(0, 0, 0, 0)' }}>

            </View> */}
            <HomeFlatList onUserIconPress={undefined} onScroll={(e: { nativeEvent: { contentOffset: { y: number; }; }; }) => {
                scrollY.setValue(e.nativeEvent.contentOffset.y)
            }} />
        </View>
    )
};
export default HomeScreen;


// <ScrollView style={{
//     backgroundColor: colors.background,
// }} contentContainerStyle={{ paddingBottom: 47 }} onScroll={Animated.event(
//     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//     { useNativeDriver: false }
// )}>
//     <View style={{ flexDirection: 'row' }}>
//         <Animated.View style={[styles.header, { transform: [{ translateY }] }]}>
//             <Text style={{ fontSize: 18, color: 'white' }}>Your Header</Text>
//         </Animated.View>
//         <Text style={{ color: "white", backgroundColor: 'green', marginStart: 'auto', fontSize: 15, fontWeight: '500', borderRadius: 10, padding: 6, margin: 12, textAlign: 'center' }} onPress={() => navigation.navigate("AddPost")}>
//             Post
//         </Text>
//     </View>
//     <HomeFlatList onUserIconPress={undefined} />
// </ScrollView>