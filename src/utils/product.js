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


export const AddToCartFirebase = async (cart, uid) => {
    await update(ref(database, "users/" + uid), {
        cart
    })
}
