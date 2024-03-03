import React, { useState } from 'react'
import { redirect } from 'react-router-dom';
import FormControl from '@mui/material/FormControl'
import { Button, InputLabel } from '@mui/material'
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import Box from "@mui/material/Box"
import Stack from '@mui/material/Stack';
import {useNavigate} from "react-router-dom"
import Link from "@mui/material/Link"

function Register() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("")
    const navigate = useNavigate();

    async function handleSubmit(event){
        event.preventDefault()
        try{
            const response = await fetch("/register", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Include cookies in the request
            })

            if (response){
                const json = await response.json()
                setStatus(json.error || json.message)
            } 

            if (response.status === 302){
                navigate("/login")
            }
        } catch(error) {
            console.error(error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <Stack>
                    <Box display="flex" justifyContent="center" alignItems="center">Register</Box>
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
                    <Button type="submit">Register</Button>
                    <p>{status}</p>
                </Stack>
            </Box>
        </form>
    );
}

export default Register
