import React, { useEffect } from 'react';
import { Box, Grid, TextField, Paper } from '@mui/material';
import {useNavigate} from "react-router-dom"

const ChatComponent = () => {
  const navigate = useNavigate()
  async function authorize(){
    const token = localStorage.getItem("auth_token")
    if( token ){
        try{
            const response = await fetch("/login/authentification", {
                method: "GET",
                headers: {
                    "authorization": token
                },
            })
            if (!response.ok){
              navigate("/login", {state: {error: "To use this page you need to log in!"}})
            }
          } catch(e){
            console.error(e)
          }
          console.log("Token verifed!")
      } else {
        navigate("/login", {state: {error: "To use this page you need to log in!"}})
      }
  }
  async function getContacts(){
    const token = localStorage.getItem("auth_token")
    if(token){
      try{
        const response = await fetch("/sensitive/users/matches", {
          method: "GET",
          headers: {
            "authorization": token
          }
        })
        const json = await response.json()
      } catch (e){
        console.error(e)
      }
    }
  }
  useEffect(()=>{
    authorize()
    getContacts()
  },[])
  const containerStyle = {
    height: '80vh',
    width: '90vw',
    margin: 'auto',
    marginTop: '10vh',  
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
  };

  const contactListStyle = {
    backgroundColor: '#f0f0f0',
    padding: '10px',
    height: '100%',
    overflow: 'auto',
  };

  const messengerStyle = {
    padding: '10px',
    height: '100%',
    overflow: 'auto',
  };

  const chatHistoryStyle = {
    height: 'calc(100% - 80px)', // Subtract input field height
    overflowY: 'scroll',
    paddingRight: '10px',
  };

  const inputFieldStyle = {
    width: 'calc(100% - 20px)',
  };

  return (
    <Box sx={containerStyle}>
      <Grid container sx={{height: "100%", boxSizing: 'border-box'}}>
        <Grid item xs={3}>
          <Paper sx={contactListStyle}>
            {/* Contact list goes here */}
            <div>Contact 1</div>
            <div>Contact 2</div>
            <div>Contact 3</div>
            <div>Contact 4</div>
            <div>Contact 5</div>
          </Paper>
        </Grid>
        <Grid item xs={9} sx={{boxSizing: 'border-box'}}> 
          <Paper sx={messengerStyle}>
            <Box sx={chatHistoryStyle}>
              {/* Chat history goes here */}
              <div style={{ textAlign: 'left' }}>Message from contact</div>
              <div style={{ textAlign: 'right' }}>Message from user</div>
              <div style={{ textAlign: 'left' }}>Another message from contact</div>
              <div style={{ textAlign: 'right' }}>Another message from user</div>
              {/* Add more messages here */}
            </Box>
            <TextField
              variant="outlined"
              placeholder="Type your message..."
              sx={inputFieldStyle}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatComponent;
