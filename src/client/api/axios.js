import axios from 'axios'

const service = axios.create({
    baseURL: '/api',
    timeout: 5000
})

// service.interceptors.request.use()
service.interceptors.response.use(
    response => {
        const res = response.data
        if (!res.success) {
            const msg = res.error ? res.error.message : 'Unknown error'
            return Promise.reject(new Error(msg))
        }
        return res.data
    },
    error => {
        const { response } = error
        const msg = response && response.data && response.data.error ? response.data.error.message : error.message
        return Promise.reject(new Error(msg))
    }
)

export default service
export { axios }