import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase/firebase-config";



//Google Sign in Providers

export const handleGoogleSignIn = async (navigate, setUserDetails) => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            setUserDetails()
            // The signed-in user info.
            // const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // console.log('user is', user)
            console.log(token)

            navigate('/')

        }).catch((error) => {
            // Handle Errors here.
            // const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage)
        });
}