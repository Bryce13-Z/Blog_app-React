import axios from 'axios'

const baseURL = "http://localhost:4000/api/comment"

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("profile"))?.token}`
    }
}

const getCommentsByPostId = (id, page) => {
    return axios
        .get(`${baseURL}/${id}/getComments?page=${page}`)
        .then((response) => {
            return response.data
        })
}

const createComment = (id, comment) => {
    return axios 
        .post(`${baseURL}/${id}/createComment`, {comment}, config)
        .then((response) => {
            return response.data
        })
}   


const commentService = {
    getCommentsByPostId,
    createComment,

}

export default commentService