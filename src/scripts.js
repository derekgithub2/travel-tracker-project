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
const tripWidget1 = document.getElementById('tripWidget1')


// global variables
let userData;
let tripData;
let currentUser;
let userTrips;


// event listeners


// functions

Promise.all([fetchData('travelers'), fetchData('trips')])
.then((data) => {
    userData = data[0].travelers
    tripData = data[1].trips
    createTraveler(userData)
    createTrips(tripData)
    onLoad(userData, tripData)
})

// traveler functions

// create function that get's the users ID by the login ID in the form. 

const onLoad = (userData, tripData) => {
    currentUser = userData[0]
    welcomeMessage.innerText = `Hello, ${currentUser.name}`
    displayAllTrips(currentUser, tripData)
    console.log("currentUser: ", currentUser)
}

const createTraveler = (userData) => { 
    return new User(userData)
}

const createTrips = (tripData) => {
    userTrips = new Trips(tripData)
    console.log("userTrips: ", userTrips)
}

const displayAllTrips = (currentUser, userTrips) => {
    console.log("LOOK HERE", currentUser.id)

    //iterate through userTrips and return the trips for just 1 user this is probably written in Trips class or User class
    // use this function to display data 
    
    tripWidget1.innerHTML = `
    <p>Destination: ${userTrips[currentUser.id].destination}</p>
    <p>Date: </p>
    <p>Duration: </p>
    <p>Travelers: </p>
    <p>Status: </p>
    `
}

// function to make a trip request (select date, duration, num of travelers and list of destinations)

// 