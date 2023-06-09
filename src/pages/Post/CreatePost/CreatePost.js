import { Container} from '@mui/material'
import React, { useState} from 'react'
import BlogForm from '../../../components/BlogForm'
import LoadingProcess from '../../../components/LoadingProcess'

import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createPost } from '../../../redux/slices/post/postSlice'

const defaultPostData = {
    title: "",
    cover: null,
    tags: [], 
}

const CreatePost = () => {

    const userToken = JSON.parse(localStorage.getItem("profile"))?.token || null
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [postData, setPostData] = useState(defaultPostData)
    const [content, setContent] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChangeCover = (event) => {
        const fileType = event.target.files[0]?.name
        // check the fileType valid or not 
        if ((/\.(jpe?g|png|gif|bmp)$/i).test(fileType)) {
            setPostData({...postData, cover:event.target.files[0]})
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
            dispatch(createPost(formData))
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

  if (!userToken) {
    return (
        <Container>
            Please log In first
        </Container>
    )
  }

  return (
    <Container>
        <BlogForm handleSubmit={handleSubmit} postData={postData} setPostData={setPostData} content={content} setContent={setContent} handleChangeCover={handleChangeCover} button={"SUBMIT"}/>
        <LoadingProcess isLoading={isLoading}/>
    </Container>
  )
}

export default CreatePost