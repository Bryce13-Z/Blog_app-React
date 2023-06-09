import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Box, Container, Grid, Stack,Typography, Divider, IconButton, Avatar, Chip, TextField, Button, Card, CardHeader, CardContent, Dialog, DialogActions, DialogTitle} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import FavoriteIcon from '@mui/icons-material/Favorite'

import LoadingProcess from '../../../components/LoadingProcess'
import Img from '../../../assets/sample_img.jpg'

import { useDispatch, useSelector } from 'react-redux'
import { getPost, likePost } from '../../../redux/slices/post/postSlice'
import { useNavigate, useParams } from 'react-router-dom'
import commentService from '../../../api/comments'

const examplePost = {
  title: "Back to Basic: Should we use Rem, Em or Pixel",
  cover: Img,
  tags: ["Next.js", "react.js"],
  content: "",
  creator: "Theodorus Clarence",
  creatorId: "", 
  creatorIcon: Img,
  likes: 2,
  updatedAt: "March 11, 2021", 
}

const returnDateReadableFormat = (ioSdate) => {
  const date = new Date(ioSdate)
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate
}

const PostDetail = () => {

  const user = JSON.parse(localStorage.getItem("profile"))?.result || null 
  const userToken = JSON.parse(localStorage.getItem("profile"))?.token || null
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const [isLoaidng, setIsLoading] = useState(true)
  const [isLoadingComments, setIsLoadingComments] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const [comment, setComment] = useState("")
  const [postComments, setPostComments] = useState([])
  const [page, setPage] = useState(1)

  const [post, setPost] = useState(null)
  const date = returnDateReadableFormat(post?.updatedAt)
  const [youlike, setYoulike] = useState(false)
  const handleLike = () => {
    if (userToken) {
      setYoulike(!youlike)
      setIsLoading(true)
      dispatch(likePost(params.id))
      .unwrap()
      .then((data) => {
        if (data?.data) {
          setPost(data.data)
          setIsLoading(false)
        } else {
          setIsLoading(false)
          alert(data.message)
        }
      }) 
      .catch((err) => {
        setIsLoading(false)
        alert(err)
      })
    } else {
      alert("Please log in first!")
    }

  }

  const handleSubmitComment = async () => {
    if (!user) {
      setComment("")
      setShowAlert(true)
    } else {

      setIsLoading(true)
      try {
        const data = await commentService.createComment(params.id, comment)
        if (data?.data) {
          // get a stored and new comment 
          let newComment = data.data 
          newComment.createdAt = returnDateReadableFormat(newComment.createdAt)

          // update the postComments state
          const updatedPostComments = postComments
          updatedPostComments.unshift(newComment)
          setPostComments(updatedPostComments)
          setComment("")
          setIsLoading(false)
        } else {
          setIsLoading(false)
          alert(data.title)
        }
      } catch(err) {
        console.log(err)
        setIsLoading(false)
        alert(err)
      }

    }
    
  }

  useEffect(() => {

    // fetch post 
    dispatch(getPost(params.id))
    .unwrap()
    .then((data) => {
      if (data?.data) {
        setPost(data?.data)
        if (user) {
          setYoulike(data?.data.likes.includes(user._id))
        }
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

    // fetch comments 
    axios.get(`http://localhost:4000/api/comment/${params.id}/getComments?page=${page}`)
    .then((response) => {
      const data = response.data 
      if (data?.data) {
        // change the date format 
        const allComments = data.data.map(comment => {
          comment.createdAt = returnDateReadableFormat(comment.createdAt)
          return comment 
        })
        setPostComments(allComments)
        setIsLoadingComments(false)
      } else {
        setIsLoadingComments(false)
        alert(data.title)
      }
    })
    .catch((err) => {
      console.log(err)
      setIsLoading(false)
      setIsLoadingComments(false)
      alert(err)     
    }) 

  }, [])

  if (isLoaidng) {
    return (
      <Container maxWidth="lg">
        <LoadingProcess isLoading={isLoaidng}/>
      </Container>  
    )
  } else {
  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <Box mt={3}>
        <Grid container spacing={2}>
          {/* cover */}
          <Grid item xs={12}>
            <img src={`data:image/png;base64,${post.cover}`} alt={post.creator} style={{height: '300px', width: '100%', objectFit: 'cover'}}/>
          </Grid>
        
          <Grid item xs={12}>
            {/* Header */}
            <Box>
              <Typography variant="h4" mb={2}>{post.title}</Typography>
              <Stack direction="row" spacing={2} mb={2}>
                <Avatar alt={post.creator} src={`data:image/png;base64,${post.creatorIcon}`}/>
                <Typography variant="subtitle1" pt={1}>{`Written on ${date} by ${post.creator}`}</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                { post.tags.map((tag, index) => (
                  <Chip key={index} label={tag}/>
                  ))
                }
              </Stack>
              <Stack direction="row" spacing={2}>
                <IconButton aria-label="add to favorites">
                  {youlike === true ? <FavoriteIcon sx={{color: 'red'}} onClick={handleLike}/> : <FavoriteIcon onClick={handleLike}/>}
                </IconButton>
                <Typography sx={{pt: 1}}>{post.likes.length}</Typography>
              </Stack>
            </Box>
            
            <Divider></Divider>

          {/* content */}            
            <Box>
              <div style={{width: '100%', minHeight: '70vh'}} dangerouslySetInnerHTML={{__html:post.content}}></div>
            </Box>

            <Divider></Divider>

          </Grid>

          
          {/* comment */}
          <Grid item xs={12} sx={{minHeight: 200}}>
              {/* input filed area */}
              <Stack spacing={2} mt={2} direction="row">
                {user ? (
                  <Box>
                    <Avatar Avatar alt={user.username} src={`data:image/png;base64,${user.userIcon}`} />
                  </Box>
                ) : (
                  <Box>
                    <Avatar Avatar alt="Guest"></Avatar>
                  </Box>
                )}
                <TextField id="outlined-multiline-static" label="Comment" fullWidth multiline rows={4} placeholder="write something..." value={comment} onChange={(event) => setComment(event.target.value)}/>
                <Button sx={{ mt: 3, mb: 2, color: 'white', bgcolor: 'black', ":hover": {bgcolor: '#1f1f1f'}, width: 'auto', height: 40 }} onClick={handleSubmitComment}>submit</Button>
              </Stack>
              {/* other comments */}

              <Stack spacing={2} mt={2} >
                {postComments.length === 0 ? (
                  <Typography>No any comment!</Typography>
                ) :
                  (postComments.map((comment) => (
                    <Card style={{ border: "none", boxShadow: "none", borderBottom: '2px solid #F5F5F5'}} key={comment._id}>
                    <CardHeader avatar={
                      <Avatar Avatar alt={comment.username} src={`data:image/png;base64,${comment.userIcon}`} />
                    } title={comment.username} subheader={comment.createdAt}/>
                    <CardContent>
                      <Typography variant='body2' color="text.secondary">
                        {comment.comment}
                      </Typography>
                    </CardContent>
                  </Card>
                  ))
                  )
                }
              </Stack>

          </Grid>

          {/* pop up */}
          <Dialog
            open={showAlert}
            onClose={() => setShowAlert(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Please Log In first!           
            </DialogTitle>
            <DialogActions>
              <Button 
                onClick={(event) => {
                  setShowAlert(false)
                }}
                >
                  No need
              </Button>
              <Button 
                onClick={(event) => {
                  navigate("/signin")
                }}
                >
                  Log In
              </Button>
            </DialogActions>
          </Dialog>

        </Grid>
      </Box>
    </Container>
  )
  }
}

export default PostDetail