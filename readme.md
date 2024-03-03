# Tinder Clone
### By Lev Samin

## Summary

This is a full-stack app developed by Lev Samin as a final project for Advanced Web Applications course.
It is a Tinder clone, full list of features will be covered later in the document.

## Features

- Full-stack Tinder clone
    - Swipeable cards
    - Authentification/authorization
    - Exchange contacts
    - Chat (WIP)
- Backend with Express.JS
- Frontend with React
    - Additional usage of MaterialUI library for styling
- MongoDB for storage
- Accessible
    - Website could be navigated entirely with keyboard, use `Tab` to switch between elements
    - Profiles could be navigated with both buttons and swipes
- Responsive
    - Application works well on all screensizes and devices
- Secure
    - All the sensitive data of the users is stored safely in behind middleware, no stray HTTP request can have it


## Installation

### Prerequisites

To run this project, you should have installed:

- Node.JS (v18)
- MongoDB (latest)
- NPM

If all above is already installed: 

1. Clone the repository or ZIP-download it
`git clone https://github.com/Login1990/tinder_clone.git`

2. Install all the dependencies via NPM
`npm install`

3. Run
`npm start`

4. The application should automatically start

> Project features both backend and frontend, however you don't need to run it on two terminals, or separetly install dependencies - it is handled with `concurrently`

## Advice

- On the AppBar you can see some of the features, most of them will not be accessible and will show you to the login screen if you try to access them
- Once you are logged in, you can swipe and chat
- On cards you can see email's of the users
- App won't work well without any userbase, so it is recommended to populate (register some accounts) the DB to make it have more users, as cards can only feature existing users
- You can log directly into another account or register another from right-up corner
- If you have matched with somebody else, you can go to Chats tab to see all the users that have matched with you as buttons
- Chat functionality was not implemented - but you still can see emails of people you have matched with!

