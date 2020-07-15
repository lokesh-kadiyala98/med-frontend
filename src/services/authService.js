import axios from 'axios'

axios.interceptors.request.use(config => {
    const token = localStorage.getItem('admin-token') || localStorage.getItem('user-token')

    if (token)
        config.headers['Authorization'] = `Bearer ${token}`

    return config
}, error => {
    Promise.reject(error)
})

export default {
    get: axios.get
}