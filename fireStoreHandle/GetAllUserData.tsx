import firestore from '@react-native-firebase/firestore';
import { store } from '../reduxIntegration/Store';
import { allUserDetails } from '../reduxIntegration/Reducer';

const usersCollection = firestore().collection('users');

async function GetAllUserData() {

    const allUsersData = {}
    try {
        const querySnapshot = await usersCollection.get();
        querySnapshot.forEach((doc) => {
            const usersData = doc.data();

            const userObject = {
                email: usersData["email"],
                name: usersData['name'],
                mobile: usersData["mobile"],
                gender: usersData["gender"],
                profileImage: usersData["profileImage"]
            };
            allUsersData[doc.id] = userObject
            console.log("userProfiles" ,usersData["profileImage"] )
        });
        store.dispatch(allUserDetails(allUsersData));
    } catch (error) {
        console.error("Error getting user data:", error);
    }
}
export default GetAllUserData;
