import request from './axios'

// resource = audio / mv
export default {
    list,                   // get all resources
    getStream,             // get the stream of resource
    upload                  // upload resource
}

function getStream(title, type) {
    return request({
        url: `/stream/${title}`,
        method: 'get',
        params: { type }
    })
}

function list(type = '') {
    return request({
        url: '/list',
        method: 'get',
        params: { type }
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