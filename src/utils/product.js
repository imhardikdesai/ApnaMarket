import { onValue, push, ref, update } from "firebase/database";
import { database, storage } from "../firebase/firebase-config";
import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
import { toast } from "react-hot-toast";

/**
 * This function retrieves all details of a specific product from a Firebase Realtime Database.
 * @returns The function `GetAllProductDetails` is returning a promise that resolves to the data of a
 * specific product with ID `-NTOPllghJneptlg0eWk` from a Firebase Realtime Database.
 */
export const GetAllProductDetails = async () => {
    return new Promise((resolve) => {
        const productRef = ref(database, 'products/-NTOPllghJneptlg0eWk');
        onValue(productRef, (snapshot) => {
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


/**
 * This function retrieves all product details from Firebase for a specific user ID.
 * @param uid - The `uid` parameter is a string representing the unique identifier of a user in a
 * Firebase database. It is used to retrieve the cart details of the user from the database.
 * @returns The function `GetAllProductDetailsFirebaseByUID` is returning a Promise that resolves to
 * the data in the Firebase database located at the path `'users/' + uid + '/cart'`. The data is
 * obtained using the `onValue` method, which listens for changes to the data at the specified path and
 * returns a snapshot of the data. The `snapshot.val()` method is then used to extract
 */
export const GetAllProductDetailsFirebaseByUID = async (uid) => {
    return new Promise((resolve) => {
        const starCountRef = ref(database, 'users/' + uid + '/cart');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            resolve(data)
        });
    });
}


export async function AddProductListing(values, image, currentUser, setProgress) {

    // colors:[],
    // cover:"https://apnamarket.netlify.app/assets/images/products/product_1.jpg"
    // id:"773b1fae-fbd5-4dd4-b3f4-cdb60f39e172"
    // name:"Nike Air Force 1 NDESTRUKT"
    // price:76.86
    // status:""

    const {
        name,
        price,
        discount,
        status
    } = values
    const productRef = ref(database, 'products/-NTOPllghJneptlg0eWk');
    const productId = new Date().getTime();
    try {
        if (image) {
            const productImageRef = storageRef(storage, `product_pic/${currentUser.uid}/${productId}`);
            setProgress(prev => prev + 10)
            await uploadBytes(productImageRef, image);
            setProgress(prev => prev + 20)
            const downloadUrl = await getDownloadURL(productImageRef);
            setProgress(prev => prev + 20)
            await push(productRef, {
                colors: ["#00AB55", "#045ABB"],
                cover: downloadUrl,
                id: productId,
                name: name,
                price: price,
                status: status,
                priceSale: discount
            });
            toast.success('Product Added Successfully !!!')
        }
    } catch (error) {
        console.error('Failed to update Profile', error);
        toast.error('Failed to Upload Product')
        throw error;
    }

}