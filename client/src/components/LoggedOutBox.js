import React from 'react'
import {Box, Button} from "@mui/material"
import { Route, useLocation, Link } from "react-router-dom";
function LoggedOutBox() {
  return (
    <Box sx={{marginLeft: "auto"}}> 
        <Button color="inherit" component={Link} to="/login">Login</Button>
        <Button color="inherit" component={Link} to="/register">Register</Button>
    </Box>
  )
}

export default LoggedOutBox