import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LikedPostScreen from "./LikedPostScreen";
import UserScreen from "./UserScreen";
import UserProfileScreen from "./UserProfileScreen";
import NewPassword from "../../authenticationUi/NewPassword";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfUsageScreen from "./TermsOfUsage";
import CategoryTypeScreen from "../../flatListComponent/CategoryTypeScreen";
import CommentScreen from "../../flatListComponent/CommentScreen";
import AddPost from "../home/AddPost";
import CommentEditScreen from "../home/CommentEditScreen";
import HomeScreen from "../home/HomeScreen";
import ProfileScreen from "../home/ProfileScreen";
import AddCategory from "../library/AddCategory";
import LibraryScreen from "../library/LibraryScreen";
import PostEditScreen from "../library/PostEditScreen";
import SearchScreen from "../searchDetails/SearchScreen";

const Stack = createNativeStackNavigator();
function UserDetailsNav() {
    return (
        <Stack.Navigator initialRouteName="UserScreen">
            <Stack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LibraryS" component={LibraryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddCategory" component={AddCategory} options={{ headerShown: false }} />
            <Stack.Screen name="AddPost" component={AddPost} options={{ headerShown: false }} />
            <Stack.Screen name="CategoryTypeScreens" component={CategoryTypeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Homes" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PostEditScreen" component={PostEditScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CommentEditScreen" component={CommentEditScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
            <Stack.Screen name="LikedPostScreen" component={LikedPostScreen} options={{ headerShown: false }} />
            <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={NewPassword} options={{ headerShown: false }} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} options={{ headerShown: false }} />
            <Stack.Screen name="TermsOfUsage" component={TermsOfUsageScreen} options={{ headerShown: false }} />

        </Stack.Navigator>
    );
}
export default UserDetailsNav;