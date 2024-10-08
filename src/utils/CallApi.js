import axios from 'axios'
import Constants from './Constants'
import Cookies from './Cookies'

export default function CallApi() {
    const post = async(endpoint, body = {}, header_ = '') => {
        const cookie = Cookies()
        const constants = Constants()
        if (cookie.Get(constants.KEY_ACCESS_TOKEN, false) != null) {
            axios.defaults.headers.common.Authorization = `Bearer ${cookie.Get(constants.KEY_ACCESS_TOKEN)?.access_token}`
        }
        return axios({
            method: 'POST',
            url: endpoint,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
                return err
            })
    }

    const put = async(endpoint, body = null) => {
        const cookie = Cookies()
        const constants = Constants()
        if (cookie.Get(constants.KEY_ACCESS_TOKEN, false) != null) {
            axios.defaults.headers.common.Authorization = `Bearer ${cookie.Get(constants.KEY_ACCESS_TOKEN)?.access_token}`
        }
        return axios({
            method: 'PUT',
            url: endpoint,
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
            // withCredentials: true,
        })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const deleteApi = async(endpoint, body = null) => {
        const cookie = Cookies()
        const constants = Constants()
        if (cookie.Get(constants.KEY_ACCESS_TOKEN, false) != null) {
            axios.defaults.headers.common.Authorization = `Bearer ${cookie.Get(constants.KEY_ACCESS_TOKEN)?.access_token}`
        }
        return axios({
            method: 'DELETE',
            url: endpoint,
            data: body,
            headers: {
                'Content-Type': 'application/json',
            },
            // withCredentials: true,
        })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const get = async(endpoint, params_ = {}, header_ = {}) => {
        const cookie = Cookies()
        const constants = Constants()
        if (cookie.Get(constants.KEY_ACCESS_TOKEN, false) != null) {
            axios.defaults.headers.common.Authorization = `Bearer ${cookie.Get(constants.KEY_ACCESS_TOKEN)?.access_token}`
        }
        return axios({
            method: 'GET',
            url: endpoint,
            headers: {
                'Content-Type': 'application/json',
                ...header_,
            },
            params: params_,
        })
            .then((res) => {
                return res.data
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const upload = async(endpoint, body = null, id) => {
        const cookie = Cookies()
        const constants = Constants()
        if (cookie.Get(constants.KEY_ACCESS_TOKEN, false) != null) {
            axios.defaults.headers.common.Authorization = `Bearer ${cookie.Get(constants.KEY_ACCESS_TOKEN, false)?.access_token}`
        }
        const data = new FormData()
        data.append('file', body.originFileObj)
        if (id) {
            data.append('id', id)
        }
        try {
            const res = await axios({
                method: 'POST',
                url: endpoint,
                data,
            })
            console.log(res)
            return res
        } catch (err) {
            console.log(err)
        }
    }

    return {
        post, get, put, deleteApi, upload,
    }
}
