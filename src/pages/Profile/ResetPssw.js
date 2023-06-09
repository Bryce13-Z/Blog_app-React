import React, {useState} from 'react'
import { Container, CssBaseline, Box, Grid, Stack, Typography, TextField, Button } from '@mui/material'

const ResetPssw = () => {

    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')

    const handleResetPssw = () => {

    }

  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
      <Box mt={5} >
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={3} sx={{textAlign: 'right'}}><Typography variant='subtitle2'>New Password:</Typography></Grid>
                <Grid item xs={9}><TextField fullWidth required type='password' value={passwordOne} onChange={(event) => {setPasswordOne(event.target.value)}}></TextField></Grid>
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack>
              <Grid container spacing={2}>
                <Grid item xs={3} sx={{textAlign: 'right'}}><Typography variant='subtitle2'>Type it again:</Typography></Grid>
                <Grid item xs={9}><TextField fullWidth required type='password' value={passwordTwo} onChange={(event) => {setPasswordTwo(event.target.value)}}></TextField></Grid>
              </Grid>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
              <Button sx={{ mt: 3, mb: 2, color: 'white', bgcolor: 'black', ":hover": {bgcolor: '#1f1f1f'}, width: 'auto' }} onClick={handleResetPssw}>Reset</Button>
            </Box>
          </Grid>
        </Grid>


      </Box>
    </Container>
  )
}

export default ResetPssw