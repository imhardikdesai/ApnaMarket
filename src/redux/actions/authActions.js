import { UPDATE_ADMIN_ROLE, UPDATE_CHANGES } from "../actionTypes"


export const updateChanges = () => {
    return {
        type: UPDATE_CHANGES,
    }
}
export const updateAdminRole = (isAdmin) => {
    return {
        type: UPDATE_ADMIN_ROLE,
        payLoad: isAdmin
    }
}