import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import AddPost from "./AddPost";

const Stack = createNativeStackNavigator();
function HomeNavigation() {
    return (
        <Stack.Navigator initialRouteName="Homes">
            <Stack.Screen name="Homes" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default HomeNavigation;