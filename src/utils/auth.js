import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { updateChanges } from "../redux/actions/authActions";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";



//Google Sign in Providers
export const handleGoogleSignIn = async (navigate, dispatch) => {
    signInWithPopup(auth, new GoogleAuthProvider())
        .then(async (result) => {
            try {
                if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
                    navigate('/');
                    const userData = {
                        uid: result.user.uid,
                        displayName: result.user.displayName,
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        isAdmin: result.user.email === 'hp676913@gmail.com' ? true : false
                    };
                    setDoc(doc(db, "users", result.user.uid), userData).then(() => {
                        toast.success('Login Successful');
                    })
                } else {
                    navigate('/')
                    toast.success(`Welcome Back ${result.user.displayName}`);
                    dispatch(updateChanges());
                }
            } catch (err) {
                console.log(err);
            }
        }).catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
};


