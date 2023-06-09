import React, {useRef, useState} from 'react'
import { Box, Stack, TextField, Button, Chip } from '@mui/material'
import ReactQuill, {Quill} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
Quill.register('modules/imageResize', ImageResize)

const BlogForm = ({handleSubmit, postData, setPostData, content, setContent, handleChangeCover, button}) => {

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  }

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video'
  ]

  const [inputTag, setInputTag] = useState('')
  const handleAddTags = (event) => {
    if (event.key === ' ') {
      const newTag = inputTag.trim()
      if (newTag && !postData.tags.includes(newTag)) {
        // let oldTags = postData.tags
        // const newTags = oldTags.append(newTag)
        setPostData({...postData, tags: [...postData.tags, newTag]})
        setInputTag('')
      }
    }
  }

  const handleDeleteTag = (tag) => {
    setPostData({...postData, tags: postData.tags.filter((t) => t!== tag)})
  }

  return (
    <Box  component="form" noValidate onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{mt: 5}}>
        <TextField id="title" label="title" variant="outlined" size="small" value={postData.title} onChange={event => setPostData({...postData, title: event.target.value})}/>
        <TextField
          fullWidth
          id="tags"
          label="tags"
          variant='outlined'
          size='small'
          sx={{ margin: "1rem 0" }}
          margin='none'
          placeholder={postData.tags.length < 5 ? "Enter tags" : ""}
          value={inputTag}
          onChange={(event) => setInputTag(event.target.value)}
          onKeyDown={handleAddTags}

          InputProps={{
            startAdornment: (
              <Box sx={{ margin: "0 0.2rem 0 0", display: "flex" }}>
                {postData.tags.map((tag, index) => {
                  return (
                    <Chip label={tag} variant="outlined" key={index} onDelete={() => handleDeleteTag(tag)} sx={{marginRight: '5px'}}/>
                  );
                })}
              </Box>
            ),
          }}
        />
        <TextField id="cover" type="file" onChange={handleChangeCover}/>

        <ReactQuill theme="snow" modules={modules} formats={formats} value={content} onChange={setContent} placeholder="Content goes here...">
        </ReactQuill>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, bgcolor: 'black', ":hover": {bgcolor: '#1f1f1f'}, width: 100 }}
        >
          {button}
        </Button>
      </Stack>

    </Box>
  )
}

export default BlogForm