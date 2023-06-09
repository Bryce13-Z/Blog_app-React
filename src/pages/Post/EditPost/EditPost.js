import { Container, Box, TextField, Stack, Button } from '@mui/material'
import React, { useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updatePost, getPostByEditReq } from '../../../redux/slices/post/postSlice'

import BlogForm from '../../../components/BlogForm'
import LoadingProcess from '../../../components/LoadingProcess'

const defaultPostData = {
    title: "",
    cover: null,
    tags: [], 
}

const EditPost = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    
    const userToken = JSON.parse(localStorage.getItem("profile"))?.token || null
    const [isLoading, setIsLoading] = useState(true)
    const [postData, setPostData] = useState({
        title: "",
        cover: "",
        tags: "", 
    })
    const [content, setContent] = useState("")
    const handleChangeCover = (event) => {
        const fileType = event.target.files[0]?.name
        // check the fileType valid or not 
        if ((/\.(jpe?g|png|gif|bmp)$/i).test(fileType)) {
            setPostData({...postData, cover:event.target.files})
        } else {
            alert("Invalid input file!")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (postData.title !== "" && postData.cover !== null && postData.tags !== [] && content !== "") {
            const formData = new FormData() 
            formData.append("title", postData.title)
            formData.append("cover", postData.cover)
            postData.tags.forEach((tag) => {
                formData.append("tags[]", tag)
            })
            formData.append("content", content)

            setIsLoading(true)
            dispatch(updatePost(formData, id))
            .unwrap()
            .then((data) => {
                if (data?.data) {
                    setPostData(defaultPostData)
                    setContent('')
                    setIsLoading(false)
                    alert("You successfully post your blog")
                    navigate("/")
                  } else if (data?.title && data?.message){
                    setIsLoading(false)
                    alert(data.message)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                alert(err)
            })

        } else {
            alert("Please fill all the fields!")
            setIsLoading(false)
        }    
    }

    useEffect(() => {
        // fetch post info with id
        if (userToken) {
            dispatch(getPostByEditReq(id))
            .unwrap()
            .then((data) => {
                if (data?.data) {
                    setPostData(data.data)
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    alert(data.title)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                alert(err)
            })
        }
    }, [])

    
    if (!userToken) {
        return (
            <Container>
                Please log In first
            </Container>
        )
    }

    if (isLoading) {
        return (
            <Container>
                <LoadingProcess isLoading={isLoading}/>
            </Container>
        )
    }

    return (
        <Container>
            <BlogForm handleSubmit={handleSubmit} postData={postData} setPostData={setPostData} content={content} setContent={setContent} handleChangeCover={handleChangeCover} button={"UPDATE"}/>
        </Container>
    )
}

export default EditPost