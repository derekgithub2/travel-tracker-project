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
let allUsers;
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
            onLoad(allUsers, currentUserID)
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

// const setCurrentUser = (currentUserID) => {
    
// }

const logout = () => {
    sessionStorage.clear();
    window.location.href = 'http://localhost:8080/'
}

const createUser = (userData, currentUserID) => { 
    console.log("inside createUser:", userData)
    console.log("currentUserID inside createUser:", currentUserID)
    console.log("not GUS yet:", currentUser)

    currentUser = userData.find(user => {
        return user.id === currentUserID
    })
    console.log("HELLOOOO IS THIS GUS?", currentUser)
    return currentUser
}

const instantiateTrip = (tripData) => {
    allUserTrips = new Trips(tripData).trips
    return allUserTrips
}

const onLoad = (allUsers) => {
    console.log('allUsers', allUsers)
    console.log("THIS SHOULD BE A NUMBER")
    console.log("inside onLoad fx:", currentUserID)
    // currentUser = userData.filter(user => {
    //     return user.id === currentUserID
    // })
    welcomeMessage.innerText = `Hello, ${allUsers[currentUserID].name}`
    // displayDashboard() --- money spent etc
    displayTrips(currentUser, destinationsData)
}

// displayDashboard = () => {

// }

const displayTrips = (currentUser, allUserTrips, destinationsData) => {

    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUser.id
    })
    console.log("LOOK HERE", currentUser)
    const destinationObj = destinationsData.filter(destination => {
        return destination.id === currentUsersTrips[currentUser.id].destinationID
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