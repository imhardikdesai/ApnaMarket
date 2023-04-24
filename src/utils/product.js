import { onValue, ref, update } from "firebase/database";
import { database } from "../firebase/firebase-config";

/**
 * This function retrieves all details of a specific product from a Firebase Realtime Database.
 * @returns The function `GetAllProductDetails` is returning a promise that resolves to the data of a
 * specific product with ID `-NTOPllghJneptlg0eWk` from a Firebase Realtime Database.
 */
export const GetAllProductDetails = async () => {
    return new Promise((resolve) => {
        const starCountRef = ref(database, 'products/-NTOPllghJneptlg0eWk');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data)
        });
    });
}


/**
 * The function updates the cart of a user in Firebase database.
 * @param cart - The `cart` parameter is an object that represents the user's shopping cart. It may
 * contain information such as the products the user has added to their cart, the quantity of each
 * product, and the total price of the cart. This object will be stored in the Firebase Realtime
 * Database under the user
 * @param uid - The `uid` parameter is a unique identifier for a user in a Firebase database. It stands
 * for "user ID".
 */
export const AddToCartFirebase = async (cart, uid) => {
    await update(ref(database, "users/" + uid), { cart })
}


/**
 * This function removes all items from a user's cart in Firebase.
 * @param uid - The "uid" parameter is a unique identifier for a user in a Firebase database. It stands
 * for "user ID". In this function, it is used to update the "cart" property of the user's data in the
 * database to an empty array, effectively removing all items from their cart.
 */
export const RemoveFromCartFirebase = async (uid) => {
    await update(ref(database, "users/" + uid), {
        cart: []
    })
}


export const GetAllProductDetailsFirebaseByUID = async (uid) => {
    return new Promise((resolve) => {
        const starCountRef = ref(database, 'users/' + uid + '/cart');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data)
        });
    });
}