import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LikedPostScreen from "./LikedPostScreen";
import UserScreen from "./UserScreen";
import ProfileScreen from "./UserProfileScreen";
import UserProfileScreen from "./UserProfileScreen";
import NewPassword from "../../authenticationUi/NewPassword";

const Stack = createNativeStackNavigator();
function UserDetailsNav() {
    return (
        <Stack.Navigator initialRouteName="Homes">
            <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LikedPostScreen" component={LikedPostScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={NewPassword} options={{ headerShown: false }} />


        </Stack.Navigator>
    );
}
export default UserDetailsNav;