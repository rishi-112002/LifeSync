import {
    Alert
} from 'react-native'
function GetApiRequest() {

    const url = "https://pcphqvtxraheujwnqaql.supabase.co/functions/v1/login";
    const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcGhxdnR4cmFoZXVqd25xYXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2NDgyMDMsImV4cCI6MjAxNjIyNDIwM30.tOYdiJgnBZhPyRQBIC2bmZ1ZtAwAklx1wQsiq08Po18";
    const header = {
        Authorization: ` Bearer ${bearerToken}`,
        "Content-Type": "application/json"
    }
    fetch(url, {
        method: "GET",
        headers: header,
    }).then((response) => {
        if (!response.ok) {
            console.log("response" , response)
            return Alert.alert("warning", "api response error ")
        }
        return response.json()
    })
        .then((data) => {
            console.log("data",data)
        }).catch((error) => {
            console.error(error)
        })
}
export default GetApiRequest;