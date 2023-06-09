import React, {useState} from 'react'
import { Box, Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Grid, Typography, Backdrop, CircularProgress} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../../redux/slices/user/userSlice'

import LoadingProcess from '../../components/LoadingProcess'

function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link to="/" style={{textDecoration: 'none', color: 'blue'}}>
          Blog App
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)

      if ((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test()) {
        const formData = {
          username: data.get('username'),
          email: data.get('email'),
          password: data.get('password'),
        }
        setLoading(true)
        dispatch(register(formData))
        .unwrap()
        .then((response) => {
          if (response?.result && response?.token) {
            navigate("/")
          } else if (response?.title && response?.message){
            setLoading(false)
            alert(response.message)
          }
        })
        .catch((error) => {
          setLoading(false)
          alert(error)
        })
      } else {
        alert("Email Format is invalid!")
      }

    }
  return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
        >
        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
            <LockOutlinedIcon sx={{color: 'white'}} />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign up
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                defaultValue=""
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                defaultValue=""
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                defaultValue=""
                />
            </Grid>
            {/* <Grid item xs={12}>
                <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                />
            </Grid> */}
            </Grid>

            <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: 'black', ":hover": {bgcolor: '#1f1f1f'} }}
            >
                Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
            <Grid item>
                <Link to="/signin" style={{textDecoration: 'none', color: 'blue'}}>
                Already have an account? Sign in
                </Link>
            </Grid>
            </Grid>
        </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
        <LoadingProcess loading={loading}></LoadingProcess>
    </Container>
  )
}

export default SignUp