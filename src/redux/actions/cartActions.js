import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE_CART_FIREBASE } from "../actionTypes"
/**
 * This function adds an object to the cart and returns an action object with the type "ADD_TO_CART"
 * and the object as the payload.
 * @param obj - The `obj` parameter is an object that contains the information of the item that needs
 * to be added to the cart. This object can have properties such as `id`, `name`, `price`, `quantity`,
 * etc. The `addToCart` function returns an action object with a type of `
 * @returns A function that returns an object with a type property set to ADD_TO_CART and a payload
 * property set to the obj parameter passed to the function.
 */

export const addToCart = (obj) => {
    return {
        type: ADD_TO_CART,
        payLoad: obj
    }
}
/**
 * This is a function that returns an object with a type and payload property to remove an item from a
 * cart.
 * @param obj - The `obj` parameter is an object that represents the item to be removed from the cart.
 * It is passed as an argument to the `removeFromCart` action creator function. The `obj` object likely
 * contains information such as the item's ID, name, price, and any other relevant details
 * @returns A function that returns an object with a type property set to the value of REMOVE_FROM_CART
 * and a payload property set to the value of the obj parameter.
 */
export const removeFromCart = (obj) => {
    return {
        type: REMOVE_FROM_CART,
        payLoad: obj
    }
}
/**
 * This is a function that returns an object with a type property of CLEAR_CART.
 * @returns The `clearCart` function is returning an object with a `type` property set to the value of
 * the `CLEAR_CART` constant.
 */
export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}
export const updateCurrentCartFirebase = (obj) => {
    return {
        type: UPDATE_CART_FIREBASE,
        payLoad: obj
    }
}