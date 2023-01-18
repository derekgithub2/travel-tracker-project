import User from '../src/User'

class Trips {
    constructor (data) {
        this.trips = data
        this.id = data.id
        this.userID = data.userID
        this.destinationID = data.destinationID
        this.travelers = data.travelers
        this.date = data.date
        this.duration = data.duration
        this.status = data.status
        this.suggestedActivites = data.suggestedActivites
    }

    getUserTrips (userID) {
        let data = this.trips
        let filteredArr = data.filter(trip => {
            return trip.userID === userID
        })
        return filteredArr
    }

}

export default Trips