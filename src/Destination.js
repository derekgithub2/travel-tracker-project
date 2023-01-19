class Destinations {
    constructor (destinationData) {
        this.data = destinationData
    }

    getDestinationID (iD) {
        return this.data.find(destination => destination.id === iD)
    }

    getDestinationIDByName (destinationName) {
        return this.data.find(destination => destination.destination === destinationName)
    }
}

export default Destinations;