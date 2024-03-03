import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import {useNavigate} from "react-router-dom"
import TinderCloneCard from "./TinderCloneCard"

//This is card interface

function Front() {
  const navigate = useNavigate()
  const [seed, setSeed] = useState();
  const cardRef = useRef();
  const [likedUser, setLikedUser] = useState();
  const reset = () => { //Rather hacky way of reseting the state of the card by changing the key of the card
    setSeed(Math.random())
  }
  //Makes sure that you have auth_key and it is valid
  async function authorize(){
    const token = localStorage.getItem("auth_token")
    console.log("Token is: "+ token)
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
  
  //Once swiped - sends request to the backend to save the liked person
  const onSwipe = async (direction) => {
    if(direction === "right"){
      const token = localStorage.getItem("auth_token")
      if(token){
        const response = await fetch("/sensitive/users/likes",{
          method: "POST",
          headers: {
            "authorization": token,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: likedUser
          })
        })
      }
    }
    console.log('You swiped: ' + direction)
  }
  
  const yes_func = async (value) => {
    await cardRef.current.swipe("right")
  }

  const no_func = async (value) => {
    await cardRef.current.swipe("left")
  }

  const onCardLeftScreen = () => {
    reset()
  }
  useEffect(()=>{
    authorize()
  },[])
  return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Container maxWidth={'xs'}>
          <TinderCard key={seed} className="pressable" ref={cardRef} onSwipe={onSwipe} preventSwipe={["up","down"]} onCardLeftScreen={() => onCardLeftScreen()}>
            <TinderCloneCard yes_func={yes_func} no_func={no_func} user_func={setLikedUser} />
          </TinderCard>
        </Container>  
      </Box>
  )
}

export default Front
