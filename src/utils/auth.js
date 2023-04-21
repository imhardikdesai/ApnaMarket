import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, database, db } from "../firebase/firebase-config";
import { updateChanges } from "../redux/actions/authActions";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { ref, set } from "firebase/database";



//Google Sign in Providers
export const handleGoogleSignIn = async (navigate, dispatch) => {
    signInWithPopup(auth, new GoogleAuthProvider())
        .then(async (result) => {
            navigate('/');
            try {
                if (result.user.metadata.creationTime === result.user.metadata.lastSignInTime) {
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
                    set(ref(database, "users/" + result.user.uid), {
                        uid: result.user.uid
                    })

                } else {
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


