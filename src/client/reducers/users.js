import {ActionNames} from "../actions";
/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {*}
 */
export default function(state = [], action) {
    switch (action.type) {
        case ActionNames.GET_USERS :
            if (!action.error) {
                const users = action.payload.data;
                return [].concat(users);
            }
            return state;
    }
    return state;
}
