import React, {useState} from 'react'
import { Container, CssBaseline, Box, Grid, Stack, Typography, Avatar, TextField, Button } from '@mui/material'

import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateInfo } from '../../redux/slices/user/userSlice'
import LoadingProcess from '../../components/LoadingProcess'


const Profile = () => {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("profile"))?.result || null
  const params = useParams()
  const id = params.id

  const [isLoading, setIsLoading] = useState(false)

  const [username, setUsername] = useState(user?.username)
  const [userIcon, setUserIcon] = useState(null)

  const handleChangeIcon = (event) => {
    const fileType = event.target.files[0]?.name
    if ((/\.(jpe?g|png|gif|bmp)$/i).test(fileType)) {
      setUserIcon(event.target.files[0])
    } else {
      alert("Invalid input file!")
    }
  }

  const handleUpload = async () => {
    setIsLoading(true)
    if (username !== user?.username || userIcon) {
      const formData = new FormData() 
      formData.append("username", username)
      formData.append("userIcon", userIcon)

      dispatch(updateInfo(formData))
      .unwrap()
      .then((data) => {
        if (data?.result) {
          alert("You successfully change your info!")
        } else if (data?.title && data?.message){
          setIsLoading(false)
          alert(data.message)
        }
      })
      .catch((error) => {
        setIsLoading(false)
        alert(error)
      })

    } else {
      alert("You don't have any change!")
    }

  }

  if (!user) {
    return (
      <Container component="main" maxWidth="xs">
        <Typography variant="h4">Please Log In First</Typography>
      </Container>
    )
  }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
      <Box mt={5} >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'flex-start', padding: 1}}>
              <Avatar alt={user.username} src={`data:image/png;base64,${user.userIcon}`} sx={{mt: 2, mr: 5, width: 50, height: 50}}/>
              <Box>
                <Typography variant="h4" sx={{mt: 1.5}}>{user.username}</Typography>
                <Typography variant="subtitle">{user.email}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={3} sx={{textAlign: 'right'}}><Typography variant='subtitle2'>Username:</Typography></Grid>
                <Grid item xs={9}><TextField fullWidth value={username} onChange={(event) => setUsername(event.target.files)} ></TextField></Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={3} sx={{textAlign: 'right'}}><Typography variant='subtitle2'>Avatar:</Typography></Grid>
                <Grid item xs={9}><TextField fullWidth type="file" onChange={handleChangeIcon}></TextField></Grid>
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button sx={{ mt: 3, mb: 2, color: 'white', bgcolor: 'black', ":hover": {bgcolor: '#1f1f1f'}, width: 'auto' }} onClick={handleUpload}>Update</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button sx={{ mt: 3, mb: 2, color: 'white', bgcolor: 'black', ":hover": {bgcolor: '#1f1f1f'}, width: 'auto' }}>
                <Link to={`/reset-password/${id}`} style={{textDecoration: 'none', color: 'white'}}>Reset Password</Link>
              </Button>
            </Box>
          </Grid>
        </Grid>

      </Box>

      <LoadingProcess isLoading={isLoading} />
    </Container>
  )
}

export default Profile