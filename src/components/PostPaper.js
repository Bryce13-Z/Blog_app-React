import React, { useState } from 'react'
import {Paper, Grid, Stack, Typography, Chip, CardActionArea, Button, Dialog, DialogTitle, DialogActions} from '@mui/material'
import { useNavigate } from 'react-router-dom'


const returnDateReadableFormat = (ioSdate) => {
    const date = new Date(ioSdate)
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate
  }


const PostPaper = ({ post, id, handleDelete }) => {

  const navigate = useNavigate()
  const date = returnDateReadableFormat(post.updatedAt)

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showEditUnavailable, setShowEditUnavailable] = useState(false)

  const handleEdit = () => {
    navigate(`/edit-blog/${post._id}`)
  }


  return (
    <CardActionArea onClick={() => { navigate(`/blog/${id}`) }}>
      <Paper sx={{padding: 1.5}} elevation={3}>
          <Grid container spacing={2}>
              <Grid item xs={10}>
                  <Stack spacing={1}>
                  <Typography variant='h6'>{post.title}</Typography>
                  <Typography variant='subtitle2'>{`Created at ${date}`}</Typography>
                  <Stack direction="row" spacing={1}>
                      {post.tags.map((tag, index) => (
                          <Chip label={tag} key={index} size='small'/>
                      ))}
                  </Stack>
                  </Stack>
              </Grid>
              <Grid item xs={2}>
                  <Stack spacing={2} alignItems="flex-end" >
                      <Button 
                        color="primary" 
                        variant="outlined"  
                        size="small" 
                        onClick={(event) =>{
                          event.stopPropagation()
                          event.preventDefault()
                          setShowEditUnavailable(true)
                        }} 
                        onMouseDown={event => event.stopPropagation()}>
                          Edit
                      </Button>
                      <Button 
                        color="error" 
                        variant="outlined"  
                        size="small" 
                        onClick={(event) => {
                          event.stopPropagation()
                          event.preventDefault()
                          setShowDeleteConfirm(true)
                        }} 
                        onMouseDown={event => event.stopPropagation()}>
                          Delete
                      </Button>
                  </Stack>
              </Grid>
          </Grid>
      </Paper>
      <Dialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`You want to delete Post: ${post.title}`}              
        </DialogTitle>
        <DialogActions>
          <Button 
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              setShowDeleteConfirm(false)
            }}
            onMouseDown={event => event.stopPropagation()}
            >
              Disagree
          </Button>
          <Button 
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              handleDelete(id)
            }} 
            color="error"
            onMouseDown={event => event.stopPropagation()}
            >
              Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showEditUnavailable}
        onClose={() => setShowEditUnavailable(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          The Edit function is not available now!            
        </DialogTitle>
        <DialogActions>
          <Button 
            onClick={(event) => {
              event.stopPropagation()
              event.preventDefault()
              setShowEditUnavailable(false)
            }}
            onMouseDown={event => event.stopPropagation()}
            >
              OK
          </Button>
        </DialogActions>
      </Dialog>
    </CardActionArea>
  )
}

export default PostPaper