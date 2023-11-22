import { Alert } from "react-native";

const apiResponse = async (props: { apiUrl: string }) => {
    const { apiUrl } = props
    try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        console.log("fetch data ", json);
        if (response.ok) {
            console.log("Get request successful");
        }
        else {
            console.log("get request failed");
            Alert.alert("Failed", "The get request is Failed ");
        }
    } catch (error) {
        console.error('Error during get request:');
        Alert.alert('Error', 'Something went wrong', [{ text: "ok ", onPress: () => { Response } }]);
    } finally {
    }
};


export default apiResponse;