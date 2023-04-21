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
            let tempTotal = state.totalPrice
            if (state.product.length === 0) {
                currentData.push(action.payLoad)
            } else if (state.product.some(item => item.id === action.payLoad.id)) {
                const index = state.product.findIndex(item => item.id === action.payLoad.id)
                currentData[index].quantity++;
                currentData[index].price = action.payLoad.basePrice + currentData[index].price
            } else {
                currentData.push(action.payLoad)
            }
            tempTotal = tempTotal + action.payLoad.basePrice
            return {
                ...state,
                total: state.total + 1,
                product: currentData,
                totalPrice: parseFloat(tempTotal.toFixed(2))
            }
        case REMOVE_FROM_CART:
            const tempData = state.product
            let tempTotalPrice = state.totalPrice
            let index = tempData.findIndex(item => item.id === action.payLoad.id)
            tempData[index].quantity--;
            tempData[index].price = tempData[index].price - tempData[index].basePrice;
            if (tempData[index].quantity === 0) {
                tempTotalPrice = tempTotalPrice - tempData[index].basePrice;
                tempData.splice(index, 1)
            } else {
                tempTotalPrice = tempTotalPrice - tempData[index].basePrice;
            }
            return {
                ...state,
                total: state.total - 1,
                product: tempData,
                totalPrice: parseFloat(tempTotalPrice.toFixed(2))
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