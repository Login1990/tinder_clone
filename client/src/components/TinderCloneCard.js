import React, {useState} from 'react'
import { Button, Card, CardContent, Typography } from '@mui/material';

function TinderCloneCard(props) {
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

  function functionHandler (data){
    props.passChildData(data)
    console.log("Hello")
  }
  return (
    <Card sx={{ maxWidth: 'xs', borderRadius: 16, margin: '0 auto', boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)', height: "80vh"}}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Header Text
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          User's Email: example@example.com
        </Typography>
        <Typography variant="body2" component="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante.
        </Typography>
      </CardContent>
      <Button sx={redButtonStyle} onClick={() => {functionHandler(false);}}>
        <span>&#10007;</span>
      </Button>
      <Button sx={greenButtonStyle} onClick={() => {functionHandler(true);}}>
        <span>&#10003;</span>
      </Button>
    </Card>
  );
}

export default TinderCloneCard
