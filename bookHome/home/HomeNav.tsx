import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import AddPost from "./AddPost";
import ProfileScreen from "./ProfileScreen";
import CategoryTypeScreen from "../../flatListComponent/CategoryTypeScreen";
import PostEditScreen from "../library/PostEditScreen";
import CommentScreen from "../../flatListComponent/CommentScreen";
import CommentEditScreen from "./CommentEditScreen";
import NewPassword from "../../authenticationUi/NewPassword";
import AddCategory from "../library/AddCategory";
import LibraryScreen from "../library/LibraryScreen";
import SearchScreen from "../searchDetails/SearchScreen";
import LikedPostScreen from "../userDetails/LikedPostScreen";
import PrivacyPolicy from "../userDetails/PrivacyPolicy";
import TermsOfUsageScreen from "../userDetails/TermsOfUsage";
import UserProfileScreen from "../userDetails/UserProfileScreen";
import UserScreen from "../userDetails/UserScreen";

const Stack = createNativeStackNavigator();
function HomeNavigation() {
    return (
        <Stack.Navigator initialRouteName="Homes">
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
export default HomeNavigation;