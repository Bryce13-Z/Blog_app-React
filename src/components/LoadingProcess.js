import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material'


const LoadingProcess = ({ isLoading }) => {
  return (
    <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default LoadingProcess