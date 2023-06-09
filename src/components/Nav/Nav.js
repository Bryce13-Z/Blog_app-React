import { Box, AppBar, Toolbar, IconButton, Typography, Button, Stack, SwipeableDrawer} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CssBaseline from '@mui/material/CssBaseline'
import styled from '@mui/material/styles'

import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { SIGNOUT } from '../../redux/slices/user/userSlice'
import NavDrawer from './NavDrawer'
import DropDownMenu from './DropDownMenu'
import DropDownAvatarMenu from './DropDownAvatarMenu'


const Nav = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem("profile"))?.result || null
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = (open) => (event) => {
    if (
      event && 
      event.type === 'keydown' && 
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setMobileOpen(open)
  }

  const handleSignOut = () => {
    dispatch(SIGNOUT())
    navigate("/")
  }

  useEffect(() => {
    
  }, [])

  return (
    <Box>
      <CssBaseline />
      <AppBar sx={{backgroundColor: 'black'}} position="static">
        <Toolbar>
          <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2, display: { xs: 'block', md: 'none'} }}
              onClick={handleDrawerToggle(true)}
            >
              <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 3, display: 'block', marginLeft: {xs: '100px', sm: '200px', md: '200px'} }}
          >
            Blog App
          </Typography> 

          {
            (user !== null && user !== undefined) ? 
              <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'block'}}}>
              <Stack spacing={3} direction='row'>
                <Button key={'Home'}>
                  <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Home</Link>
                </Button>
                
                <DropDownMenu title={"Blog"} menuIterms={["Create Blog", "My Blogs", "My Favorite Blogs"]} routes={["/create-blog", `/my-blogs/${user._id}`, `/my-favorite-blogs/${user._id}`]}/>

                <DropDownAvatarMenu username={user.username} userIcon={user?.userIcon} id={user._id} handleSignOut={handleSignOut}/>

              </Stack>
            </Box>  :
              <Box sx={{ flexGrow: 1, display: {xs: 'none', md: 'block'}}}>
              <Stack spacing={2} direction='row'>
                <Button key={'Home'}>
                  <Link to="/" style={{ textDecoration: 'none', color: 'white'}}>Home</Link>
                </Button>
                <Button key={'SignIn'}>
                  <Link to="/signin" style={{ textDecoration: 'none', color: 'white'}}>Sign In</Link>
                </Button>
                <Button key={'SignUp'}>
                  <Link to="/signup" style={{ textDecoration: 'none', color: 'white'}}>Sign Up</Link>
                </Button>
              </Stack>
            </Box>
          }

        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle(false)}
        onOpen={handleDrawerToggle(true)}
      >
        <NavDrawer handleDrawerToggle={handleDrawerToggle} user={user} handleSignOut={handleSignOut}/>
      </SwipeableDrawer>
      
      


    </Box>
  )
}

export default Nav