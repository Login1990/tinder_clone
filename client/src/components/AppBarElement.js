import React from 'react'
import { Box } from '@mui/material'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Button } from '@mui/material'
import { Route, useLocation, Link } from "react-router-dom";
import LoggedInBox from './LoggedInBox'
import LoggedOutBox from './LoggedOutBox'

//This is an AppBar, it is always up

function AppBarElement() {
    const location = useLocation()
    const hasAuthKey = localStorage.getItem('auth_key') !== null;
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button component={Link} to="/" color="inherit">Home</Button>
                    <Button component={Link} to="/swipe" color="inherit">Swipe</Button>
                    <Button component={Link} to="/chats" color="inherit">Chats</Button>
                    {hasAuthKey ? <LoggedInBox/> : <LoggedOutBox/>}
                </Toolbar>
            </AppBar>
        </Box>
      )
}

export default AppBarElement
