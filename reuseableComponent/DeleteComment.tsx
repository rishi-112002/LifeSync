import firestore from '@react-native-firebase/firestore'
const DeleteComment = async (postId: string ,commentId:string) => {
  
    try {
        await firestore().collection("posts").doc(postId).collection("comments").doc(commentId).delete();
        console.log("comment deleted successfully" , commentId);
    } catch (error) {
        console.log("Error deleting comment", error);
    }
}
export default DeleteComment;