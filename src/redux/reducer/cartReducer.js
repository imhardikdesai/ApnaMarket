import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from "../actionTypes"

const initialState = {
    totalPrice: 0,
    total: 0,
    product: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const currentData = state.product
            if (state.product.length === 0) {
                currentData.push(action.payLoad)
            } else if (state.product.some(item => item.id === action.payLoad.id)) {
                const index = state.product.findIndex(item => item.id === action.payLoad.id)
                currentData[index].quantity++;
                currentData[index].price = action.payLoad.price + currentData[index].price
            } else {
                currentData.push(action.payLoad)
            }
            return {
                ...state,
                total: state.total + 1,
                product: currentData,
                totalPrice: state.totalPrice + action.payLoad.basePrice
            }
        case REMOVE_FROM_CART:
            const tempData = state.product
            let index = tempData.findIndex(item => item.id === action.payLoad.id)
            tempData[index].quantity--;
            tempData[index].price = tempData[index].price - tempData[index].basePrice;
            if (tempData[index].quantity === 0) {
                tempData.splice(index, 1)
            }
            return {
                ...state,
                total: state.total - 1,
                product: tempData,
                totalPrice: state.totalPrice - action.payLoad.basePrice
            }
        case CLEAR_CART:
            return {
                ...state,
                product: [],
                total: 0,
                totalPrice: 0,
            }
        default:
            return { ...state }
    }
}

export default cartReducer