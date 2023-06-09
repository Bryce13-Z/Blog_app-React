import React, {useEffect, useState} from 'react'
import {Box, Container, Divider, Grid, Typography, InputBase} from '@mui/material'
import { alpha, styled } from '@mui/material/styles';

import PostCard from '../../components/PostCard'
import PaginationTemplate from '../../components/PaginationTemplate'
import LoadingProcess from '../../components/LoadingProcess'

import { useDispatch } from 'react-redux'
import { getPosts } from '../../redux/slices/posts/postsSlice'


const CustomizedInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.mode === 'light' ? '#F3F6F9' : '#1A2027',
    border: '1px solid',
    borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    fontSize: 16,
    minWidth: '400px',
    padding: '10px 12px',
    transition: theme.transitions.create([
      'border-color',
      'background-color',
      'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}))

const Home = () => {

  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [numberOfPage, setNumberOfPage] = useState(1)

  const handleChangePage = (value) => {
    if (value !== page) {
      setPage(value)
      setIsLoading(true)
      dispatch(getPosts(value))
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
    dispatch(getPosts(page))
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

  }, [])

  if (isLoading) {
    return <LoadingProcess isLoading={isLoading} />
  }

  return (
    <Container maxWidth='lg' sx={{marginTop: 2}}>
      <Box sx={{height: 200}}>
        <Grid container >
          <Grid item sx={{width: 'auto'}} mb={2}>
            <Typography variant="h2" sx={{fontWeight: 600, backgroundImage: 'linear-gradient(241deg, rgba(176,172,238,1) 0%, rgba(0,212,255,1) 79%)'}}>Blog</Typography>
          </Grid>
          <Grid item xs={12} mb={2}>
            <Typography>Thoughts, ideas and tutorial about techniques</Typography>
          </Grid>
          <Grid item xs={12}>
            <CustomizedInput defaultValue="Search..."/>
          </Grid>
        </Grid>
      </Box>
      <Divider></Divider>
      <Box mt={5} minHeight={500}>
        <Container sx={{width: '100%'}}>
          <Grid container spacing={{xs: 2, sm: 4}} columns={{xs: 4, sm: 8, md: 12}}>
            {posts.map((post) => (
              <PostCard key={post._id} post={post}/>
            ))}
          </Grid>
        </Container>
      </Box>
        
      <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}} mt={10}>
        <PaginationTemplate count={numberOfPage} page={page} handleChangePage={handleChangePage}/>
      </Box>
    </Container>
    )
  
}

export default Home