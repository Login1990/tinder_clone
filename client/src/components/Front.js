import { Box, Button, Container } from '@mui/material'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import {useNavigate} from "react-router-dom"
import TinderCloneCard from "./TinderCloneCard"



function Front() {
  const navigate = useNavigate()
  const [seed, setSeed] = useState();
  const cardRef = useRef();
  const reset = () => {
    setSeed(Math.random())
  }
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

/*  useEffect(()=>{
    async function func(){
      if(childData){
        await cardRef.current.swipe("right")
      } else {
        await cardRef.current.swipe("left")
      }
    }
    if (isMounted.current){
      func()
    } else {
      isMounted.current = true
    }
  }, [childData])*/
  return (
      /*<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <TinderCard onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
      </Box>*/
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Container maxWidth={'xs'}>
          <TinderCard key={seed} className="pressable" ref={cardRef} onSwipe={onSwipe} preventSwipe={["up","down"]} onCardLeftScreen={() => onCardLeftScreen()}>
            <TinderCloneCard yes_func={yes_func} no_func={no_func}/>
          </TinderCard>
        </Container>  
      </Box>
  )
}

export default Front
