import PostRequest from "../apiCalling/PostRequest";

function LoginData(props :{ object :{email:String , password :String}}) {
const {object } = props
console.log("LoginData : ",object)
    PostRequest({
        requestData: {
            email: object.email,
            password: object.password
        }
       
    })

}
export default LoginData;