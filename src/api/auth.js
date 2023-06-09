import axios from 'axios'

const baseURL = "http://localhost:4000/api/user/"


const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("profile"))?.token}`
    }
}

const register = (formData) => {
    return axios
        .post(`${baseURL}register`, formData)
        .then((response) => {
            if (response.data?.token) {
                localStorage.setItem("profile", JSON.stringify({result: response.data.result, token: response.data.token}))
            }
            return response.data
        })

}

const signIn = (formData) => {

    return axios
        .post(`${baseURL}login`, formData)
        .then((response) => {
                if (response.data?.token) {
                    localStorage.setItem("profile", JSON.stringify({result: response.data.result, token: response.data.token}))
                }
                return response.data
            })
}

const updateInfo = (formData) => {
    return axios
    .patch(`${baseURL}update`, formData, config)
    .then((response) => {
        if (response.data?.result) {
            const user = JSON.parse(localStorage.getItem("profile"))
            localStorage.setItem("profile", JSON.stringify({result: response.data.result, token: user.token}))
        }
        return response.data
    })
}


const authService = {
    register, 
    signIn,
    updateInfo
}

export default authService 

