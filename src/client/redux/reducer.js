import { ACTIONS } from './action'
import { combineReducers } from 'redux';


function storage(state = {}, action) {
    switch (action.type) {
        case ACTIONS.STORAGE_FETCHED:
            return {
                list: action.data
            }

        case ACTIONS.STORAGE_FETCHED_STREAM:
            return Object.assign({}, {...state}, { stream: action.data })

        default:
            return state;
    }
}

export default combineReducers({ storage });