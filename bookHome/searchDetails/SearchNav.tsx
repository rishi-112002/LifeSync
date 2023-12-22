import CategoryTypeScreen from "../../flatListComponent/CategoryTypeScreen";
import CommentScreen from "../../flatListComponent/CommentScreen";
import AddPost from "../home/AddPost";
import CommentEditScreen from "../home/CommentEditScreen";
import ProfileScreen from "../home/ProfileScreen";
import AddCategory from "../library/AddCategory";
import PostEditScreen from "../library/PostEditScreen";
import SearchScreen from "./SearchScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
function SearchNavigation() {
    return (
        <Stack.Navigator initialRouteName="SearchScreen">
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
            <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryTypeScreens" component={CategoryTypeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PostEditScreen" component={PostEditScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CommentEditScreen" component={CommentEditScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default SearchNavigation;







