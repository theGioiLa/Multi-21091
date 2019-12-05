import { storage } from '../api'
import { message } from 'antd'

const ACTIONS = {
    STORAGE_FETCHED: 'STORAGE_FETCHED_LIST',
    STORAGE_ERROR: 'STORAGE_FETCHED_ERROR',
    STORAGE_FETCHED_STREAM: 'STORAGE_FETCHED_STREAM'
}

function success(type, data) { return { type, data } }

function list(type) {
    return dispatch => {
        storage.list(type).then(
            list => {
                dispatch(success(ACTIONS.STORAGE_FETCHED, list));
            },
            error => {
                message.error(error.message);
            }
        )
    }
}

function getStream(title, type) {
    return dispatch => {
        storage.getStream(title, type).then(
            stream => {
                dispatch(success(ACTIONS.STORAGE_FETCHED_STREAM, { info: stream, type }))
            },
            error => {
                message.error(error.message)
            }
        )
    }
}

export {
    list,
    getStream,
    ACTIONS
};