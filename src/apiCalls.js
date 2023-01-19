import * as dayjs from 'dayjs'

const fetchData = (urlPath) => {
    return fetch(`http://localhost:3001/api/v1/${urlPath}`)
            .then(response => response.json())
}

const addNewTrip = (id, userID, destinationID, tripTravelers, tripDate, tripDuration, tripStatus) => {
    const fetchObject = {
        id: +id,
        userID: +userID,
        destinationID: +destinationID,
        travelers: +tripTravelers,
        date: dayjs(tripDate).format('YYYY/MM/DD'),
        duration: +tripDuration,
        status: tripStatus,
        suggestedActivities: []
    }
    return fetch('http://localhost:3001/api/v1/trips', {
        method: "POST",
        body: JSON.stringify(fetchObject), 
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export { fetchData } 
export { addNewTrip }