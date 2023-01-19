import './css/styles.css';
import './images/flight-icon.png'
import { fetchData } from '../src/apiCalls'
import { addNewTrip } from '../src/apiCalls';
import Trips from './Trips';
import Destinations from './Destination';

// QUERY SELECTORS
const welcomeMessage = document.getElementById('welcomeMessage')
const loginButton = document.getElementById('loginButton')
const loginPage = document.getElementById('loginPage')
const logoutButton = document.getElementById('logoutButton')
const username = document.getElementById('usernameInput');
const password = document.getElementById('passwordInput');
const totalSpentDisplay = document.getElementById('totalSpentDisplay')
const tripsDisplayContainer = document.getElementById('tripsDisplayContainer')
const tripRequestForm = document.getElementById('tripRequestForm')
const numOfTravelersInput = document.getElementById('numOfTravelersInput')
const numOfDaysInput = document.getElementById('numOfDaysInput')
const dateInput = document.getElementById('dateInput')
const destinationOptions = document.getElementById('destinationOptions')

// GLOBAL VARIABLES
let userData;
let tripData;
let currentUser;
let currentUserID;
let allUserTrips;
let destinationsData;
let allDestinations
let currentUsersTrips;
let currentUserDestinations;
let idsArray;

// EVENT LISTENERS
loginButton.addEventListener('click', function (event) {
    event.preventDefault();
    checkLogin(event);
    callPromise();
})

const callPromise = () => {
    Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
        .then((data) => {
            userData = data[0].travelers
            tripData = data[1].trips
            destinationsData = data[2].destinations
            createUser(userData, currentUserID)
            instantiateTrip(tripData)
            instantiateDestinations(destinationsData)
            onLogin(currentUser, allUserTrips, destinationsData)
            updateDashboardDisplay()
        })
}

logoutButton.addEventListener('click', function(event) {
    event.preventDefault();
    logout();
})

tripRequestForm.addEventListener('submit', function(event) {
    event.preventDefault();

    addNewTrip(tripData.length+1, currentUserID, allDestinations.getDestinationIDByName(destinationOptions.value).id, numOfTravelersInput.value, dateInput.value, numOfDaysInput.value, 'pending', [])
    .then(response => {
        if (response.ok) {
            callPromise()
            return response.json()
        } 
        throw new Error('Something went wrong', (`${response.status}: ${response.statusText}`))
        })
    .catch((error) => {
        alert (error)
    })
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

const instantiateDestinations = (destinationsData) => {
    allDestinations = new Destinations(destinationsData)
    return allDestinations
}

const onLogin = (currentUserID, allUserTrips, destinationsData) => {
    getDestinationsArray(currentUserID, allUserTrips, destinationsData)
    getUserDestinations(currentUserID, allUserTrips, destinationsData)
    displayMoneySpent(allUserTrips, destinationsData)
}

const displayMoneySpent = (allUserTrips, destinationsData) => {
    
    currentUsersTrips = allUserTrips.filter(trip => trip.userID === currentUserID);

    idsArray = currentUsersTrips.map(userTrip => userTrip.destinationID);

    let usersDestinations = destinationsData.filter(destinationTrip => {
        return destinationTrip.id === idsArray[0]})

    let moneySpent = Math.round((usersDestinations[0].estimatedLodgingCostPerDay) * (currentUsersTrips[0].duration) + (usersDestinations[0].estimatedFlightCostPerPerson) * (currentUsersTrips[0].travelers) * (1.1))

    totalSpentDisplay.innerText = `Total Spent on Trips This Year: $${moneySpent}*`
}

const getDestinationsArray = (currentUserID, allUserTrips, destinationsData) => {

    currentUsersTrips = allUserTrips.filter(trip => {
        return trip.userID === currentUserID})
    let destinationsArray = destinationsData.filter(destination => {
        let array = []

        for (let i = 0; i < currentUsersTrips.length; i++) {
            if (destination.id === currentUsersTrips[i].destinationID) {
                array.push(destination)
            }
        }
        return array
    })
    return destinationsArray
}

const updateDashboardDisplay = () => {
    welcomeMessage.innerText = `Hello, ${currentUser.name}`

    tripsDisplayContainer.innerHTML = ""

    currentUsersTrips.forEach((trip) => {
        let destination = allDestinations.getDestinationID(trip.destinationID)
        tripsDisplayContainer.innerHTML += `
        <div class="widget" id="widget">
            <img id="destination-image" src="${destination.image}" alt="${destination.alt}">
            <p>Destination: ${destination.destination}</p>
            <p>Date: ${trip.date}</p>
            <p>Duration: ${trip.duration} days</p>
            <p>Travelers: ${trip.travelers}</p>
            <p>Status: ${trip.status}</p>
        </div>`
    })
}

const getUserDestinations = (currentUserID, allUserTrips, destinationsData) => {
    idsArray = allUserTrips.filter(trip => trip.userID === currentUserID).map(userTrip => {
        return userTrip.destinationID
    });

    return currentUserDestinations = destinationsData.filter(destination => idsArray.includes(destination.id))
}
