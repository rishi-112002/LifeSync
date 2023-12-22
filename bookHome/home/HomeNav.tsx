import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import AddPost from "./AddPost";
import ProfileScreen from "./ProfileScreen";
import CategoryTypeScreen from "../../flatListComponent/CategoryTypeScreen";
import PostEditScreen from "../library/PostEditScreen";
import CommentScreen from "../../flatListComponent/CommentScreen";
import CommentEditScreen from "./CommentEditScreen";
import AddCategory from "../library/AddCategory";
const Stack = createNativeStackNavigator();
function HomeNavigation() {
    return (
        <Stack.Navigator initialRouteName="Homes">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
            <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryTypeScreens" component={CategoryTypeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Homes" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PostEditScreen" component={PostEditScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CommentEditScreen" component={CommentEditScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
export default HomeNavigation;