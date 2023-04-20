import { UPDATE_ADMIN_ROLE, UPDATE_CHANGES } from "../actionTypes"

/**
 * This function returns an object with a type property of "UPDATE_CHANGES".
 * @returns A Redux action object with a type property set to the value of the constant UPDATE_CHANGES.
 */

export const updateChanges = () => {
    return {
        type: UPDATE_CHANGES,
    }
}
/**
 * This function updates the admin role with a boolean value.
 * @param isAdmin - isAdmin is a boolean value that represents whether a user has an admin role or not.
 * The updateAdminRole function takes this boolean value as an argument and returns an action object
 * with a type of UPDATE_ADMIN_ROLE and a payload of the isAdmin value. This action object can then be
 * dispatched to the Redux store
 * @returns A Redux action object with a type of "UPDATE_ADMIN_ROLE" and a payload of the isAdmin
 * value.
 */
export const updateAdminRole = (isAdmin) => {
    return {
        type: UPDATE_ADMIN_ROLE,
        payLoad: isAdmin
    }
}
