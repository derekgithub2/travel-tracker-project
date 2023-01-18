// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/login-icon.png'

import User from "./User"
import { fetchData } from '../src/apiCalls'
import Trips from './Trips';

// QUERY SELECTORS
const welcomeMessage = document.getElementById('welcomeMessage')
const tripWidget1 = document.getElementById('tripWidget1')
const loginButton = document.getElementById('loginButton')
const loginPage = document.getElementById('loginPage')
const logoutButton = document.getElementById('logoutButton')
const username = document.getElementById('usernameInput');
const password = document.getElementById('passwordInput');
const totalSpentDisplay = document.getElementById('totalSpentDisplay')
const tripsDisplayContainer = document.getElementById('tripsDisplayContainer')

// GLOBAL VARIABLES
let userData;
let tripData;
let currentUser;
let currentUserID;
let allUserTrips;
let destinationsData;
let currentUsersTrips;
const dayjs = require('dayjs')
//import dayjs from 'dayjs' // ES 2015
// dayjs().format()

// EVENT LISTENERS
loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    checkLogin(event);

    Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
        .then((data) => {
            userData = data[0].travelers
            tripData = data[1].trips
            destinationsData = data[2].destinations
            createUser(userData, currentUserID)
            instantiateTrip(tripData)
            onLoad(currentUser, allUserTrips, destinationsData)
    })
})

logoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    logout();
})

// FUNCTIONS

const checkLogin = (event) => {
    let prefix = 'traveler'
    let num = username.value.slice(prefix.length)

    if ((username.value.startsWith(prefix) && !isNaN(num)) && password.value === 'travel') {
        loginPage.classList.add('hidden')
        getUserID(username)
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

const onLoad = (currentUser, allUserTrips, destinationsData) => {
    welcomeMessage.innerText = `Hello, ${currentUser.name}`


    getUserDestinations(currentUserID, allUserTrips, destinationsData)


    displayMoneySpent(allUserTrips, destinationsData)
    displayTrips(currentUserID, allUserTrips, destinationsData)
}

const displayMoneySpent = (allUserTrips, destinationsData) => {
    
    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUserID
    })
    console.log("currentUsersTrips", currentUsersTrips)

    let idsArray = currentUsersTrips.map(userTrip => {
        return userTrip.destinationID
    });

    let usersDestinations = destinationsData.filter(destinationTrip => {
        // idsArray.forEach(el => {
        //     if (destinationTrip.id === idsArray[el]){
        //         usersDestinations.push(destinationTrip)
        //     }
        // })
        return destinationTrip.id === idsArray[0]
    })
    console.log("usersDestinations array", usersDestinations)

    totalSpentDisplay.innerText += `
        $${(usersDestinations[0].estimatedLodgingCostPerDay)+(usersDestinations[0].estimatedFlightCostPerPerson)*(1.1)}`
}

//need function to get an array of destinations for current user
// will need destinationsData, currentUserID

const getUserDestinations = (currentUserID, allUserTrips, destinationsData) => {

    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUserID
    })
    // console.log("CURRENT USERS TRIPS", currentUsersTrips)

    let filteredArray = destinationsData.filter(destination => {
        let array = []

        for (let i = 0; i < currentUsersTrips.length; i++) {
            if(destination.id === currentUsersTrips[i].destinationID){
                array.push(destination)
            }
        }
        return array
    })
    return filteredArray
}

const displayTrips = (currentUserID, allUserTrips, destinationsData) => {
    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUserID
    })

    let idsArray = currentUsersTrips.map(userTrip => {
        return userTrip.destinationID
    });

    let childElements = tripsDisplayContainer.children;

    for(let i = 0; i < childElements.length; i++) {
        let reduced = destinationsData.filter(destinationTrip => {
            return destinationTrip.id === idsArray[i]
        })

        childElements[i].innerHTML = `
            <p>Destination: ${reduced[i].destination}</p>
            <p>Date: ${currentUsersTrips[i].date}</p>
            <p>Duration: ${currentUsersTrips[i].duration} days</p>
            <p>Travelers: ${currentUsersTrips[i].travelers}</p>
            <p>Status: ${currentUsersTrips[i].status}</p>
        `
    }

}
