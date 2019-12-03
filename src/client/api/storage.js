import request from './axios'

// resource = audio / mv
export default {
    list,                   // get all resources
    getPayload,             // get the stream of resource
    getMetadata,            // get metadata of resource
    upload                  // upload resource
}

function getPayload(params) {
    return request({
        url: '/payload',
        method: 'get',
        params
    })
}

function getMetadata(params) {
    return request({
        url: '/metadata',
        method: 'get',
        params
    })
}

function list(type = 'all') {
    return request({
        url: '/list',
        method: 'get',
        params: { type, name: 'Hlleo' }
    })
}

function upload(params, data) {
    return request({
        url: '/upload',
        method: 'post',
        params,
        data
    })
}