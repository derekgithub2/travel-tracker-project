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
let destinationsData;


// event listeners


// functions

Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
.then((data) => {
    userData = data[0].travelers
    tripData = data[1].trips
    destinationsData = data[2].destinations
    instantiateTraveler(userData)
    instantiateTrip(tripData)
    onLoad(userData, tripData)
})

// traveler functions

// create function that get's the users ID by the login ID in the form. 

const onLoad = (userData, tripData) => {
    setCurrentUser(userData)
    // displayDashboard() --- money spent etc
    displayAllTrips(currentUser, tripData, destinationsData)
}

const setCurrentUser = (userData) => {
    currentUser = userData[0]
    welcomeMessage.innerText = `Hello, ${currentUser.name}`
    // make this dynamic so that it takes in what was inputted in login form. 
}

const instantiateTraveler = (userData) => { 
    return new User(userData)
}

const instantiateTrip = (tripData) => {
    userTrips = new Trips(tripData)
    // console.log("currentUser: ", currentUser)

}

const displayAllTrips = (currentUser, userTrips, destinationsData) => {
    // console.log("LOOK HERE", currentUser)
    // console.log("userTrips: ", userTrips)
    // console.log("destinationsData", destinationsData)

    let currentUserID = currentUser.id

    console.log(userTrips.getUserTrips(currentUserID))

    // let destinationID = desinationsData.destinationID
    // const destinationObj = destinationsData.find(destination => {
    //     return destination.id === userTrips[]
    // })

    //iterate through userTrips and return the trips for just 1 user this is probably written in Trips class or User class
    // use this function to display data 

    tripWidget1.innerHTML = `
    <p>Destination: ${userTrips[currentUserID].destinationID}</p>
    <p>Date: </p>
    <p>Duration: </p>
    <p>Travelers: </p>
    <p>Status: </p>
    `
}

// function to make a trip request (select date, duration, num of travelers and list of destinations)

// 