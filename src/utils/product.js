import { onValue, push, ref, update } from "firebase/database";
import { database, storage } from "../firebase/firebase-config";
import { getDownloadURL, uploadBytes, ref as storageRef } from "firebase/storage";
import { toast } from "react-hot-toast";
import { PRODUCT_COLOR } from '../_mock/products';
/**
 * This function retrieves all details of a specific product from a Firebase Realtime Database.
 * @returns The function `GetAllProductDetails` is returning a promise that resolves to the data of a
 * specific product with ID `-NTOPllghJneptlg0eWk` from a Firebase Realtime Database.
 */
export const GetAllProductDetails = async () => {
    return new Promise((resolve) => {
        const productRef1 = ref(database, 'products/-NTOPllghJneptlg0eWk');
        const productRef2 = ref(database, 'products/listing');
        onValue(productRef1, (snapshot) => {
            const data1 = snapshot.val();
            onValue(productRef2, (snapshot) => {
                const data2 = snapshot.val();
                resolve(data1.concat(Object.values(data2)).reverse())
            })
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
    const temp = [...PRODUCT_COLOR]
    const {
        name,
        price,
        discount,
        status
    } = values
    const productRef = ref(database, 'products/listing');
    const productId = new Date().getTime();
    try {
        if (image) {
            const productImageRef = storageRef(storage, `product_pic/${currentUser.uid}/${productId}`);
            setProgress(prev => prev + 10)
            await uploadBytes(productImageRef, image);
            setProgress(prev => prev + 20)
            const downloadUrl = await getDownloadURL(productImageRef);
            setProgress(prev => prev + 20)

            const firstNumber = Math.floor(Math.random() * temp.length - 1); // generates random number between 0 and 10
            const secondNumber = Math.floor(Math.random() * ((temp.length - 1) - firstNumber + 1)) + firstNumber; // generates random number between firstNumber and 10
            await push(productRef, {
                // PRODUCT_COLOR.slice(0, 2))
                // colors: ["#00AB55", "#045ABB"],
                colors: temp.slice(firstNumber, secondNumber),
                cover: downloadUrl,
                id: productId,
                name: name,
                price: price,
                status: status,
                priceSale: discount
            }).then(() => {
                toast.success('Product Added Successfully !!!')
            })
        }
    } catch (error) {
        console.error('Failed to update Profile', error);
        toast.error('Failed to Upload Product')
        throw error;
    }
}