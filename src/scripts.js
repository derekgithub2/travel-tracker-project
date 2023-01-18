// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/flight-icon.png'
import { fetchData } from '../src/apiCalls'
import Trips from './Trips';

// QUERY SELECTORS
const welcomeMessage = document.getElementById('welcomeMessage')
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
let currentUserDestinations
let idsArray
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
}

const instantiateTrip = (tripData) => {
    allUserTrips = new Trips(tripData).trips
    return allUserTrips
}

const onLoad = (currentUser, allUserTrips, destinationsData) => {
    welcomeMessage.innerText = `Hello, ${currentUser.name}`


    getDestinationsArray(currentUserID, allUserTrips, destinationsData)
    getUserDestinations(currentUserID, allUserTrips, destinationsData)

    displayMoneySpent(allUserTrips, destinationsData)
    displayTrips(currentUserID, allUserTrips, destinationsData)
}

const displayMoneySpent = (allUserTrips, destinationsData) => {
    
    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUserID
    })

    let idsArray = currentUsersTrips.map(userTrip => {
        return userTrip.destinationID
    });

    let usersDestinations = destinationsData.filter(destinationTrip => {
        return destinationTrip.id === idsArray[0]
    })

    totalSpentDisplay.innerText += `
        $${(usersDestinations[0].estimatedLodgingCostPerDay)*(currentUsersTrips[0].duration)+(usersDestinations[0].estimatedFlightCostPerPerson)*(currentUsersTrips[0].travelers)*(1.1)}*`
}

const getDestinationsArray = (currentUserID, allUserTrips, destinationsData) => {

    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUserID
    })

    let destinationsArray = destinationsData.filter(destination => {
        let array = []

        for (let i = 0; i < currentUsersTrips.length; i++) {
            if(destination.id === currentUsersTrips[i].destinationID){
                array.push(destination)
            }
        }
        return array
    })
    return destinationsArray
}

const displayTrips = (currentUserID, allUserTrips, destinationsData) => {
    idsArray = allUserTrips.filter(trip => trip.userID === currentUserID).map(userTrip => {
        return userTrip.destinationID
    });

    currentUserDestinations = destinationsData.filter(destination => idsArray.includes(destination.id))

    let childElements = tripsDisplayContainer.children;
    Array.from(childElements).forEach(function(childElement, index) {
        childElement.innerHTML = `
            <p>Destination: ${currentUserDestinations[index].destination}</p>
            <p>Date: ${currentUsersTrips[index].date}</p>
            <p>Duration: ${currentUsersTrips[index].duration} days</p>
            <p>Travelers: ${currentUsersTrips[index].travelers}</p>
            <p>Status: ${currentUsersTrips[index].status}</p>
        `
    })
    return currentUserDestinations
}

const getUserDestinations = (currentUserID, allUserTrips, destinationsData) => {
    idsArray = allUserTrips.filter(trip => trip.userID === currentUserID).map(userTrip => {
        return userTrip.destinationID
    });

    return currentUserDestinations = destinationsData.filter(destination => idsArray.includes(destination.id))
}
