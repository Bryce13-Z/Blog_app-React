import React from 'react'
import { Box, Stack, Typography, IconButton } from '@mui/material'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

const Tag = ({ data, tags, setPostData }) => {
    return (
        <Box
          sx={{
            background: "#283240",
            height: "100%",
            display: "flex",
            padding: "0.4rem",
            margin: "0 0.5rem 0 0",
            justifyContent: "center",
            alignContent: "center",
            color: "#ffffff",
          }}
        >
          <Stack direction='row' gap={1}>
            <Typography>{data}</Typography>
            <IconButton aria-label="delete">
                <HighlightOffIcon />
            </IconButton>
          </Stack>
        </Box>
    )
}

export default Tag
  