import { ADD_TO_CART, REMOVE_FROM_CART } from "../actionTypes"

const initialState = {
    total: 0,
    products: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                total: state.total + 1
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                total: state.total - 1
            }
        default:
            return { ...state }
    }
}

export default cartReducer