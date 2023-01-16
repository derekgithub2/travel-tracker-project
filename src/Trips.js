import User from '../src/User'

class Trips {
    constructor (tripsData) {
        this.tripsData = tripsData
    }

    getUserTrips (userID) {
        // console.log(this.trips[userID])
        return this.tripsData[userID]
    }

}

export default Trips