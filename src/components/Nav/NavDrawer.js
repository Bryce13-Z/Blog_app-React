import React from 'react'
import {Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import { Link } from 'react-router-dom';

const NavDrawer = ({ handleDrawerToggle, user, userToken, handleSignOut}) => {

  if (user !== null && user !== undefined)
    return (
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={handleDrawerToggle(false)}
        onKeyDown={handleDrawerToggle(false)}
      >
        <List>
          <ListItem>
            <ListItemButton>
              <Link to="/" style={{textDecoration: "none", color: "black"}}><ListItemText primary={"Home"}/></Link>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemButton>
              <Link to="/create-blog" style={{textDecoration: "none", color: "black"}}><ListItemText primary={"Create Blog"}/></Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to={`/my-blogs/${user._id}`} style={{textDecoration: "none", color: "black"}}><ListItemText primary={"My Blogs"}/></Link>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <Link to={`/my-favorite-blogs/${user._id}`} style={{textDecoration: "none", color: "black"}}><ListItemText primary={"My Favorite Blogs"}/></Link>
            </ListItemButton>
          </ListItem>
          </List>
        <Divider />
          <List>
            <ListItem>
              <ListItemButton>
                <Link to={`/profile/${user._id}`} style={{textDecoration: "none", color: "black"}}><ListItemText primary={"Edit User Info"}/></Link>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton onClick={handleSignOut}>
                <ListItemText primary={"Sign Out"}/>
              </ListItemButton>
            </ListItem>
          </List>
      </Box>
    )

  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={handleDrawerToggle(false)}
      onKeyDown={handleDrawerToggle(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to="/" style={{textDecoration: "none", color: "black"}}><ListItemText primary={"Home"}/></Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to="/signin" style={{textDecoration: "none", color: "black"}}><ListItemText primary={"Sign In"}/></Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <Link to="/signup" style={{textDecoration: "none", color: "black"}}><ListItemText primary={"Sign Up"}/></Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}

export default NavDrawer