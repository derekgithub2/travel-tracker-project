import User from '../src/User'

class Trips {
    constructor (data) {
        this.tripsData = data
    }

    getUserTrips (userID) {
        let data = this.tripsData
        let filteredArr = data.filter(trip => {
            return trip.userID === userID
        })
        console.log("IN FX HERE:", filteredArr)
        return filteredArr
    }

}

export default Trips