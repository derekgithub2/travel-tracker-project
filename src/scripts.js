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
const loginButton = document.getElementById('loginButton')
const loginPage = document.getElementById('loginPage')
const logoutButton = document.getElementById('logoutButton')

// global variables
let userData;
let tripData;
let currentUser;
let allUserTrips;
let destinationsData;
let currentUsersTrips;

// event listeners
loginButton.addEventListener('submit', function (event) {
    event.preventDefault();
    checkLogin();
})

logoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    logout();
})

// functions

Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
.then((data) => {
    userData = data[0].travelers
    tripData = data[1].trips
    destinationsData = data[2].destinations
    instantiateUser(userData)
    instantiateTrip(tripData)
    onLoad(userData, tripData)
})

const checkLogin = () => {
    let username = document.getElementById('usernameInput').value;
    let password = document.getElementById('password').value;
    if (username === 'derek22' && password === 'yeh') {
        // window.location.href = `http://localhost:8080/`
        getUserID(username)
        console.log("here", getUserID(username))
        loginPage.classList.add('hidden')
    } else {
        document.getElementById('errorMessage').innerHTML = "Invalid username or password"
    }
    // Use an if statement to check if the username and password match a predefined set of credentials. If the credentials match, use window.location.href to redirect the user to a different page, such as the homepage. If the credentials do not match, display an error message to the user.
}

const getUserID = (username) => {
    return str.replace(/\D/g, '');
}

const logout = () => {
    sessionStorage.clear();
    window.location.href = 'http://localhost:8080/'
}
// traveler functions

// create function that get's the users ID by the login ID in the form. 
const instantiateUser = (userData) => { 

    currentUser = userData[0]
    const currentUserID = currentUser.id
    return currentUser, currentUserID
}

const instantiateTrip = (tripData) => {
    allUserTrips = new Trips(tripData).trips
    return allUserTrips
}

const onLoad = (userData, tripData) => {
    // setCurrentUser(userData)
    welcomeMessage.innerText = `Hello, ${currentUser.name}`
    // displayDashboard() --- money spent etc
    displayTrips(currentUser, tripData, destinationsData)
}

// const setCurrentUser = (userData) => {
    // make this dynamic so that it takes in what was inputted in login form. 
//     return currentUser
// }

const displayTrips = (currentUser, allUserTrips, destinationsData) => {

    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUser.id
    })

    console.log(currentUsersTrips)

    const destinationObj = destinationsData.filter(destination => {
        return destination.id === currentUsersTrips[0].destinationID
    })

    //iterate through allUserTrips and return the trips for just 1 user this is probably written in Trips class or User class
    // use this function to display data 

    tripWidget1.innerHTML += `
    <p>Destination: ${destinationObj[0].destination}</p>
    <p>Date: ${currentUsersTrips[0].date}</p>
    <p>Duration: ${currentUsersTrips[0].duration} days</p>
    <p>Travelers: ${currentUsersTrips[0].travelers}</p>
    <p>Status: ${currentUsersTrips[0].status}</p>
    `
}

// function to make a trip request (select date, duration, num of travelers and list of destinations)

// 