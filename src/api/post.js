import axios from 'axios'

const baseURL = "http://localhost:4000/api/post"

const config = {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("profile"))?.token}`
    }
}

const getPosts = (page) => {
    return axios
        .get(`${baseURL}?page=${page}`)
        .then((response) => {
            return response.data
        })
}

const getPostsByUserId = (page) => {
    return axios
        .get(`${baseURL}/getPostsByUserId/${page}`, config)
        .then((response) => {
            return response.data
        })
}

const getPostsByLiked = (page) => {
    return axios
        .get(`${baseURL}/getPostsByLiked/${page}`, config)
        .then((response) => {
            return response.data
        })
}

const getPost = (id) => {
    return axios
        .get(`${baseURL}/${id}`)
        .then((response) => {
            return response.data
        })
}

const getPostByEditReq = (id) => {
    return axios
        .get(`${baseURL}/getPostByEditing/${id}`, config)
        .then((response) => {
            return response.data
        })
}

const createPost = (formData) => {
    return axios
        .post(`${baseURL}/`, formData, config)
        .then((response) => {
                return response.data
            })
}

const updatePost = (formData,id) => {
    return axios
        .patch(`${baseURL}/${id}`, formData, config)
        .then((response) => {
            return response.data
        })
}

const deletePost = (id) => {
    return axios
        .delete(`${baseURL}/${id}`, {headers: config.headers})
        .then((response) => {
            return response.data
        })
}

const likePost = (id) => {
    return axios
        .patch(`${baseURL}/${id}/likePost`, {}, config)
        .then((response) => {
            return response.data
        })
}

const commentPost = (id) => {
    return axios
        .patch(`${baseURL}/${id}/commentPost`, {}, config)
        .then((response) => {
            return response.data
        })
}

const postService = {
    createPost,
    getPost,
    getPosts,
    getPostsByUserId,
    getPostByEditReq,
    updatePost,
    deletePost,
    likePost,
    getPostsByLiked,
    commentPost
}

export default postService