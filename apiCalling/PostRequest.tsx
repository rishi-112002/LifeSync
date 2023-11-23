 function PostRequest() {
    console.log("api call")
    const apiUrl = "https://pcphqvtxraheujwnqaql.supabase.co/functions/v1/login";
    const requestData = {
        email: "te@gmail.com",  
        password: "123",
    };

    const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcGhxdnR4cmFoZXVqd25xYXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA2NDgyMDMsImV4cCI6MjAxNjIyNDIwM30.tOYdiJgnBZhPyRQBIC2bmZ1ZtAwAklx1wQsiq08Po18";

    const headers = {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
    };
         fetch(apiUrl, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(requestData)
        }).then((response) => response.json())
            .then((data) => {
                console.log(data.data.email);
            }).catch((error) => {
                console.error('Error during get request:', error);
            })
    
}
export default PostRequest;