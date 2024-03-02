import { Box, Stack } from '@mui/material'
import React from 'react'

function Welcome() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Stack>
            <h1>Welcome to the Tinder Clone</h1>
            <h2>To use the features of the website, please register or log in.</h2>
        </Stack>
    </Box>
  )
}

export default Welcome
