// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/login-icon.png'

import User from "./User"
import { fetchData } from '../src/apiCalls'
import Trips from './Trips';

// query selectors
const welcomeMessage = document.getElementById('welcomeMessage')

// global variables
let userData;
let tripData;
let currentUser;

// event listeners


// functions

Promise.all([fetchData('travelers'), fetchData('trips')])
.then((data) => {
    userData = data[0].travelers
    tripData = data[1].trips
    createTraveler(userData)
    createTrips(tripData)
    onLoad(userData)
})

// const generateRandomUserId = (min, max) => {
//     randomUserId = Math.floor(Math.random() * (max - min) + 1)
// } 

// traveler functions

const onLoad = (userData) => {
    welcomeMessage.innerText = `Hello, ${userData}`
    console.log("userData: ", userData)
}

const createTraveler = (userData) => { 
    return new User(userData)
}

const createTrips = (tripData) => {
    return new Trips(tripData) 
}

// function to make a trip request (select date, duration, num of travelers and list of destinations)

// 