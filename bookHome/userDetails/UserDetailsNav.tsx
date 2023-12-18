import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LikedPostScreen from "./LikedPostScreen";
import UserScreen from "./UserScreen";

const Stack = createNativeStackNavigator();
function UserDetailsNav() {
    return (
        <Stack.Navigator initialRouteName="Homes">
            <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LikedPostScreen" component={LikedPostScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default UserDetailsNav;