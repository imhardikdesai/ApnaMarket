import { onValue, ref } from "firebase/database";
import { database } from "../firebase/firebase-config";

export const GetAllProductDetails = async () => {
    return new Promise((resolve) => {
        const starCountRef = ref(database, 'products/-NTOPllghJneptlg0eWk');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data)
        });
    });
}