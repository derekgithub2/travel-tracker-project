//api network requests
const fetchData = (urlPath) => {
    return fetch(`http://localhost:3001/api/v1/${urlPath}`)
            .then(response => response.json())
}

const addNewTrip = (id, userID, destinationID, tripTravelers, tripDate, tripDuration, tripStatus, tripActivities) => {
    fetch('http://localhost:3001/api/v1/trips', {
        method: "POST",
        body: JSON.stringify({
            id: id,
            userID: userID,
            destinationID: destinationID,
            travelers: tripTravelers,
            date: tripDate,
            duration: tripDuration,
            status: tripStatus,
            suggestedActivities: tripActivities
        }), 
        header: {
            "Content-Type": "applicaton/json"
        }
        .then(response => {
            if(response.ok) {
                return response.json()
            } 
            throw new Error('Something went wrong')
        })
        .catch((error) => {
            alert(error)
        })
    })
}

export { fetchData } 
export { addNewTrip }