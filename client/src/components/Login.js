import React, { useState, useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import { useLocation } from 'react-router-dom'
import {
    FormControl,
    Button,
    InputLabel,
    Box,
    Stack,
    FormHelperText,
    Input   
} from "@mui/material"
import { Link } from 'react-router-dom'

function Login(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const navigate = useNavigate();
    const {state} = useLocation()
    useEffect(()=>{
        if(state){
            setStatus(state.error)
        }
    },[])
    async function handleSubmit(e){
        try{
            e.preventDefault()
            const response = await fetch("/login",{
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Include cookies in the request
            })
            const token = await response.json()
            if (response.status === 200){
                setStatus(token.message || token.error)
                localStorage.setItem("auth_token", token["token"])
                navigate("/swipe")
            } else {
                setStatus(token.message || token.error)
            }
        } catch(e){
            console.error(e)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Stack>
                    <Box display="flex" justifyContent="center" alignItems="center">Login</Box>
                    <FormControl>
                        <InputLabel>Email</InputLabel>
                        <Input id="my-email" aria-describedby="my-helper-text" value={email} onInput={e => setEmail(e.target.value)} />
                        <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Password</InputLabel>
                        <Input type="password" id="my-password" aria-describedby="my-helper-text" value={password} onInput={e => setPassword(e.target.value)}/>
                        <FormHelperText id="my-helper-text">We'll never share your password.</FormHelperText>
                    </FormControl>
                    <Button type="submit">Login</Button>
                    <Button component={Link} to="/register">Not a member yet?</Button>
                    <p>{status}</p>
                </Stack>
            </Box>
        </form>
    )
}

export default Login
