// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/login-icon.png'

import User from "./User"

// query selectors


// global variables
let travlerData;

// event listeners


// functions

Promise.all([fetchData('travevlerData')])
.then((data) => {
    travelerData = data[0].travelers
})

// traveler functions

// display all trips

// function to make a trip request (select date, duration, num of travelers and list of destinations)

// 