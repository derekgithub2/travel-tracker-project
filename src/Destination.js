class Destinations {
    constructor (destinationData) {
        this.id = destinationData.id
        this.destination = destinationData.destination
        this.estimatedLodgingCostPerDay = destinationData.estimatedLodgingCostPerDay
        this.estimatedFlightCostPerPerson = destinationData.estimatedFlightCostPerPerson
        this.image = destinationData.image
        this.alt = destinationData.alt
    }

    getDestinationID (userID) {
        return this.destinationData.find(destination => destination.id === userID)
    }

}


export default Destinations;