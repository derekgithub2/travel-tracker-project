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
const username = document.getElementById('usernameInput');
const password = document.getElementById('passwordInput');
const totalSpentDisplay = document.getElementById('totalSpentDisplay')

// global variables
let userData;
let tripData;
let currentUser;
let currentUserID;
let allUserTrips;
let destinationsData;
let currentUsersTrips;

// event listeners
loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    checkLogin(event);

    Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
        .then((data) => {
            // console.log('in Promise')
            userData = data[0].travelers
            tripData = data[1].trips
            destinationsData = data[2].destinations
            createUser(userData, currentUserID)
            instantiateTrip(tripData)
            onLoad(currentUser)
    })
})

logoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    logout();
})

// functions

const checkLogin = (event) => {
    if (username.value === 'derek22' && password.value === 'yeh') {
        loginPage.classList.add('hidden')
        getUserID(username)
        // setCurrentUser(currentUserID)
        // window.location.href = `http://localhost:8080/?uname=${username.value}&psw=${password.value}`
    } else {
        document.getElementById('errorMessage').innerHTML = "Invalid username or password"
    }
    event.preventDefault();
}

const getUserID = (input) => {
    let value = input.value
    let match = value.match(/(\d+)/);
    currentUserID = parseInt(match[0])
    return currentUserID
}

const logout = () => {
    sessionStorage.clear();
    window.location.href = 'http://localhost:8080/'
}

const createUser = (userData, currentUserID) => { 
    currentUser = userData.find(user => {
        return user.id === currentUserID
    })
    return currentUser
    // currentUser is an object
}

const instantiateTrip = (tripData) => {
    allUserTrips = new Trips(tripData).trips
    return allUserTrips
}

const onLoad = (currentUser) => {
    // console.log('INSIDE ONLOAD currentUser:', currentUser)
    // console.log("THIS SHOULD BE A NUMBER")
    // console.log("inside onLoad fx:", currentUserID)
    welcomeMessage.innerText = `Hello, ${currentUser.name}`
    displayTrips(currentUser, destinationsData)
}

const displayTrips = (currentUser, allUserTrips, destinationsData) => {

    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUserID
    })
    console.log("LOOK HERE currentUsersTrips", currentUsersTrips)
    const destinationObj = destinationsData.filter(destination => {
        return destination.id === currentUsersTrips[currentUser.id].destinationID
    })

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