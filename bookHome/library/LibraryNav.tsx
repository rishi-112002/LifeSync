import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LibraryScreen from "./LibraryScreen";
import AddCategory from "./AddCategory";
import CategoryTypeScreen from "../../flatListComponent/CategoryTypeScreen";
import AddPost from "../home/AddPost";
import PostEditScreen from "./PostEditScreen";

const Stack = createNativeStackNavigator();
function LibraryNavigation() {
    return (
        <Stack.Navigator initialRouteName="Homes">
            <Stack.Screen name="LibraryS" component={LibraryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
            <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryTypeScreens" component={CategoryTypeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PostEditScreen" component ={PostEditScreen}options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default LibraryNavigation;