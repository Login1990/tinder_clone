import React, {useEffect, useState} from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material';


//Primarly visual - the card fetches from backend and propagates it up, to the card "spawn point" to process
function TinderCloneCard(props) {
  const [userEmail, setUserEmail] = useState()
  const buttonStyle = {
    position: 'absolute',
    bottom: '20px',
    width: "4vw",
    height: "4vw",
    borderRadius: '50%', // Make the button round
    padding: '10px', // Adjust padding for better aesthetics
  };

  const greenButtonStyle = {
    ...buttonStyle,
    right: '20px',
    backgroundColor: 'green',
    color: 'white',
  };

  const redButtonStyle = {
    ...buttonStyle,
    left: '20px',
    backgroundColor: 'red',
    color: 'white',
  };

  async function grabUserData(){
    const token = localStorage.getItem("auth_token")
    if(token){
      try{
        const response = await fetch("/sensitive/users/random", {
          method: "GET",
          headers: {
            "authorization": token
          }
        })
        const json = await response.json()
        setUserEmail(json.email)
        user_handler(json.email)
      } catch (e){
        console.error(e)
      }
    }
  }

  function yes_handler (){
    props.yes_func()
  }

  function user_handler(user){
    props.user_func(user)
  }
  function no_handler(){
    props.no_func()
  }

  useEffect(()=>{
    grabUserData()
  }, [])
  return (
    <Card sx={{ maxWidth: 'xs', borderRadius: 16, margin: '0 auto', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)', height: "80vh"}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Profile
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          User's Email: {userEmail}
        </Typography>
        <Typography variant="body2" component="p">
          There is no profile capablities so far
        </Typography>
      </CardContent>
      <Button sx={redButtonStyle} onClick={() => {no_handler();}}>
        <span>&#10007;</span>
      </Button>
      <Button sx={greenButtonStyle} onClick={() => {yes_handler();} }>
        <span>&#10003;</span>
      </Button>
    </Card>
  );
}

export default TinderCloneCard
