import { Box, Container } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import TinderCard from 'react-tinder-card'
import {useNavigate} from "react-router-dom"



function Front() {
  const navigate = useNavigate()
  async function authorize(){
    const token = localStorage.getItem("auth_token")
    console.log("Token is: "+ token)
    if( token ){
        console.log("Token found!")
        console.log("Token verification...")
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
  const onSwipe = (direction) => {
    console.log('You swiped: ' + direction)
  }
  
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }
  useEffect(()=>{
    authorize()
  },[])
  return (
      /*<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
      </Box>*/
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Container maxWidth={'xs'}>
          <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')}>Hello, World!</TinderCard>
        </Container>
      </Box>
  )
}

export default Front
