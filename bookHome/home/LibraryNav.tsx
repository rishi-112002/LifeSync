import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LibraryScreen from "./LibraryScreen";
import AddCategory from "./AddCategory";

const Stack = createNativeStackNavigator();
function LibraryNavigation() {
    return (
        <Stack.Navigator initialRouteName="Homes">
            <Stack.Screen name="LibraryS" component={LibraryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default LibraryNavigation;