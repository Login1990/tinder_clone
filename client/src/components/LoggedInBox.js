import React from 'react'
import {Box, Button} from "@mui/material"
import { Route, useLocation, Link, useNavigate} from "react-router-dom";

function LoggedInBox(props) {
    const navigate = useNavigate()
    const handleButtonClick = () => {
        localStorage.clear()
        navigate("/")
    }
  return (
    <Box sx={{marginLeft: "auto"}}> 
        <Button color="inherit" onClick={handleButtonClick}>Log out</Button>
    </Box>
  )
}

export default LoggedInBox