import React, {useRef, useState} from 'react'
import {Grid, Card, CardHeader, CardMedia, CardContent, CardActions, Avatar, IconButton, Typography, Button, Stack, Chip, CardActionArea} from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { useNavigate } from 'react-router-dom'

const returnDateReadableFormat = (ioSdate) => {
  const date = new Date(ioSdate)
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate
}


const PostCard = ({post}) => {

  const navigate = useNavigate()
  const [youlike, setYoulike] = useState(false)
  const date = returnDateReadableFormat(post.updatedAt)

  const handleLike = () => {
    setYoulike(!youlike)
  }

  return (
    <Grid  item xs={4} sm={4} md={4} sx={{cursor: "pointer"}}>
    <Card sx={{maxWidth: 365, boxShadow: 3}}>
      <CardActionArea onClick={() => {navigate(`/blog/${post._id}`)}}>
      <CardMedia
        component="img"
        height='194'
        image={`data:image/png;base64,${post.cover}`}
        alt="Post"
      />

      <CardHeader
        // avatar={
        // <Avatar alt={post.creator} src={post.creatorIcon} />
        // }
        title={post.title}
        subheader={`Writen on ${date} by ${post.creator}`}
      />
      <CardContent>
        <Stack direction="row" spacing={1}>
          { post.tags.map((tag, index) => (
            <Chip key={index} label={tag} variant='outlined'/>
            ))
          }
        </Stack>
      </CardContent>
      </CardActionArea>
    </Card>
    </Grid>
  )
}

export default PostCard