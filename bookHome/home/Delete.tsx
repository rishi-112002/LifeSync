import firestore from '@react-native-firebase/firestore'
const deletePost = async (postId: string) => {
    try {
        await firestore().collection("posts").doc(postId).delete();
        console.log("Post deleted successfully" , postId);
    } catch (error) {
        console.log("Error deleting post", error);
    }
}
export default deletePost;