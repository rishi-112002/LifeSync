import firestore from '@react-native-firebase/firestore';
import { store } from '../reduxIntegration/Store';
import { allUserDetails } from '../reduxIntegration/Reducer';

const usersCollection = firestore().collection('users');

async function GetAllUserData() {

    const allUsersData = {}
    try {
        usersCollection.onSnapshot((querySnapshot) => {

            querySnapshot.forEach((doc) => {
                const usersData = doc.data();
                const userObject = {
                    email: usersData["email"],
                    name: usersData['name'],
                    mobile: usersData["mobile"],
                    gender: usersData["gender"],
                    profileImage: usersData["profileImage"],
                    followerCount: usersData["follower"],
                    followingCount: usersData["followingCount"]
                };
                allUsersData[doc.id] = userObject;
            });
            store.dispatch(allUserDetails(allUsersData));
        });
    } catch (error) {
        console.error("Error getting user data:", error);
    }
}
export default GetAllUserData;

