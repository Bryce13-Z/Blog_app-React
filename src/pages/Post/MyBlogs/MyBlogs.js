import React, { useEffect, useState } from 'react'
import { Container, Stack, Box, Button, Typography } from '@mui/material'

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsByUserId, deletePostFromPosts } from '../../../redux/slices/posts/postsSlice'
import { deletePost } from '../../../redux/slices/post/postSlice'

import PostPaper from '../../../components/PostPaper'
import PaginationTemplate from '../../../components/PaginationTemplate'
import LoadingProcess from '../../../components/LoadingProcess'

// const examplePost = [
//     {
//         _id: 1,
//         title: "React Loading State Pattern using Toast & SWR",
//         updatedAt: "2023-05-29T15:13:50.145+00:00",
//         tags: ["next.js", "react", "pattern"],
//     },
//     {
//         _id: 2,
//         title: "React Loading State Pattern using Toast & SWR",
//         updatedAt: "2023-05-29T15:13:50.145+00:00",
//         tags: ["next.js", "react", "pattern"],
//     },
//     {
//         _id: 3,
//         title: "React Loading State Pattern using Toast & SWR",
//         updatedAt: "2023-05-29T15:13:50.145+00:00",
//         tags: ["next.js", "react", "pattern"],
//     },
//     {
//         _id: 4,
//         title: "React Loading State Pattern using Toast & SWR",
//         updatedAt: "2023-05-29T15:13:50.145+00:00",
//         tags: ["next.js", "react", "pattern"],
//     },
// ]

const MyBlogs = () => {

  const postsFromStore = useSelector(state => state.posts.data) || []
  const dispatch = useDispatch()
  const userToken = JSON.parse(localStorage.getItem("profile"))?.token || null
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [posts, setPosts] = useState(null)
  const [page, setPage] = useState(1)
  const [numberOfPage, setNumberOfPage] = useState(1)

  const handleDelete = (id) => {

    setIsLoading(true)
    dispatch(deletePost(id))
    .unwrap()
    .then((data) => {
        if (data?.message && data?.title) {
            setIsLoading(false)
            console.log(data)
            alert(data.title)
        } else {
            dispatch(deletePostFromPosts(id))
            setPosts(postsFromStore)
            setIsLoading(false)
            window.location.reload(false)
        }
    })
    .catch((err) => {
        setIsLoading(false)
        alert(err)
    })
  }

  const handleChangePage = (value) => {
    if (value !== page) {
        setPage(value)
        setIsLoading(true)
        dispatch(getPostsByUserId(value))
        .unwrap()
        .then((data) => {
        if (data?.data && data?.currentPage && data?.numberOfPage) {
                setPosts(data.data)
                setPage(data.currentPage)
                setNumberOfPage(data.numberOfPage)
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
  }

  useEffect(() => {
    dispatch(getPostsByUserId(page))
    .unwrap()
    .then((data) => {
      if (data?.data && data?.currentPage && data?.numberOfPage) {
            
            setPosts(data.data)
            setPage(data.currentPage)
            setNumberOfPage(data.numberOfPage)
            setIsLoading(false)
      } else {
        setIsLoading(false)
        console.log(data)
        alert(data.title)
      }
    })
    .catch((err) => {
        setIsLoading(false)
        alert(err)
    })
  }, [])


  if (!userToken) {
    return (
        <Container>
            Please log In first
        </Container>
    )
  } 

  if (isLoading || posts === null) {
    <LoadingProcess isLoading={isLoading}/>
  }
  else {

  return (
    <Container maxWidth='md' sx={{marginTop: 10}}>
        <Box sx={{minHeight: '75vh'}}>
            {posts?.length === 0 &&                 
                <Stack spacing={2} maxWidth={600}>
                    <Typography variant='h4'>
                        You don't have your own blogs, Go to create One!!!
                    </Typography>
                    <Link to='/create-blog' style={{textDecoration: 'none', width: 'auto', display: 'block'}}>
                        <Button>Create a blog</Button>
                    </Link>
                </Stack>}
            {posts?.length !== 0 &&
                <Stack spacing={2}>
                    {posts.map((post) => (
                        <PostPaper post={post} key={post._id} id={post._id} handleDelete={handleDelete}/>
                    ))}
                </Stack>               
            }
        </Box>
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}} mt={5}>
            <PaginationTemplate count={numberOfPage} page={page} handleChangePage={handleChangePage}/>
        </Box>
    </Container>
  )
  }
}

export default MyBlogs