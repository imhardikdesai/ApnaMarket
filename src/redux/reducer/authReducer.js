import { UPDATE_ADMIN_ROLE, UPDATE_CHANGES } from "../actionTypes"

const initialState = {
    status: false,
    isAdmin: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHANGES:
            return {
                ...state,
                status: !state.status
            }
        case UPDATE_ADMIN_ROLE:
            return {
                ...state,
                isAdmin: action.payLoad
            }
        default:
            return { ...state }
    }
}

export default authReducer