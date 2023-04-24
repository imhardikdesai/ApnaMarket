import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { GetAllProductDetails } from "./product";


/**
 * This function retrieves a list of all users from a Firestore database and returns an array of user
 * objects with specific properties.
 * @returns The function `GetAllUserList` returns an array of user objects. Each user object contains
 * the user's `id`, `avatarUrl`, `name`, `company`, `isVerified` status, `status`, and `role`.
 */
export const GetAllUserList = async () => {
    const usersRef = collection(db, 'users');
    try {
        const querySnapshot = await getDocs(usersRef);
        const users = [];
        querySnapshot.forEach(doc => {
            const { uid, photoURL, displayName } = doc.data()
            const template = {
                id: uid,
                avatarUrl: photoURL,
                name: displayName,
                company: "Amazon",
                isVerified: true,
                status: 'active',
                role: 'UX Designer',
            }
            users.push(template);
        });
        return users;
    } catch (e) {
        console.log(e);
    }
}

/**
 * This function retrieves the details of the current user from a Firestore database.
 * @param currentUser - The currentUser parameter is an object that represents the currently logged-in
 * user. It likely contains information such as the user's unique ID (uid), email address, display
 * name, and other user profile data.
 * @returns The function `GetCurrentUserDetails` returns either an object containing the data of the
 * current user (if the user document exists in the "users" collection in the Firestore database), or
 * `null` if the user document does not exist or if there is an error while retrieving the document.
 */
export const GetCurrentUserDetails = async (currentUser) => {
    const userRef = doc(db, 'users', currentUser.uid);
    try {
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
            return userDoc.data();
        } else {
            return null;
        }
    } catch (e) {
        return null;
    }
}


export const GetNumbersForAdminDashboard = () => {
    return new Promise((resolve) => {
        GetAllUserList().then(user => {
            GetAllProductDetails().then(product => {
                resolve({ user: user.length, product: product.length })
            })
        })
    });
}