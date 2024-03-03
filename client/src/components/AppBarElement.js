import React from 'react'
import { Box } from '@mui/material'
import { AppBar } from '@mui/material'
import { Toolbar } from '@mui/material'
import { Button } from '@mui/material'
import { Route, useLocation, Link } from "react-router-dom";

function AppBarElement() {
    const location = useLocation()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
                <Toolbar>
                    <Button component={Link} to="/" color="inherit">Home</Button>
                    <Button component={Link} to="/swipe" color="inherit">Swipe</Button>
                    <Button component={Link} to="/chats" color="inherit">Chats</Button>
                    <Box sx={{marginLeft: "auto"}}> 
                        {(location.pathname === "/login") ?  <></> : <Button color="inherit" component={Link} to="/login">Login</Button>}
                        {(location.pathname === "/register") ?  <></> : <Button color="inherit" component={Link} to="/register">Register</Button>}
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
      )
}

export default AppBarElement
