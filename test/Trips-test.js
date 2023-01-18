import chai from 'chai';
import Destination from '../src/Destination'
import Trips from '../src/Trips'

const expect = chai.expect;

describe('Trips', function() {

    let userID;
    let userTrip1;
    let trips;

    const userData = [
        {"id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"},
        {"id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"},
        {"id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper" },
        {"id": 4,
        "name": "Leila Thebeaud",
        "travelerType": "photographer"},
        {"id": 5,
        "name": "Tiffy Grout",
        "travelerType": "thrill-seeker"
    }]

    const tripData = [
        {"id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 3,
        "userID": 3,
        "destinationID": 22,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 4,
        "userID": 43,
        "destinationID": 14,
        "travelers": 2,
        "date": "2022/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 5,
        "userID": 42,
        "destinationID": 29,
        "travelers": 3,
        "date": "2022/04/30",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 6,
        "userID": 29,
        "destinationID": 35,
        "travelers": 3,
        "date": "2022/06/29",
        "duration": 9,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 7,
        "userID": 37,
        "destinationID": 17,
        "travelers": 5,
        "date": "2022/5/28",
        "duration": 20,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 8,
        "userID": 36,
        "destinationID": 39,
        "travelers": 6,
        "date": "2022/02/07",
        "duration": 4,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 9,
        "userID": 1,
        "destinationID": 19,
        "travelers": 5,
        "date": "2022/12/19",
        "duration": 19,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 10,
        "userID": 9,
        "destinationID": 50,
        "travelers": 6,
        "date": "2022/07/23",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 11,
        "userID": 50,
        "destinationID": 5,
        "travelers": 4,
        "date": "2022/10/14",
        "duration": 4,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 12,
        "userID": 33,
        "destinationID": 33,
        "travelers": 6,
        "date": "2022/10/17",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 13,
        "userID": 14,
        "destinationID": 12,
        "travelers": 1,
        "date": "2022/02/12",
        "duration": 11,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 14,
        "userID": 19,
        "destinationID": 35,
        "travelers": 1,
        "date": "2022/09/24",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []},
        {"id": 15,
        "userID": 50,
        "destinationID": 13,
        "travelers": 3,
        "date": "2022/07/04",
        "duration": 6,
        "status": "approved",
        "suggestedActivities": []
    }]

    beforeEach(function() {
        userTrip1 = new Trips(tripData[0]);
        userTrip2 = new Trips(tripData[1]);
        trips = new Trips(tripData);

    })

    it('should be a function', function () {

        expect(Trips).to.be.a('function')
    })

    it('should be an instance of User', function() {
        expect(userTrip1).to.be.an.instanceOf(Trips);
    })

    it.skip('should have a date', function () {
    })

    it.skip('should have a date', function () {
    })

    it.skip('should have a date', function () {
    })

    it('should have a function that returns the trips for 1 user in an array', function () {

        userID = user1.id
        
        let method = trips.getUserTrips(userID)

        expect(method).to.be.an("array");
        expect(method).to.deep.equal(
            [{"id": 9,
            "userID": 1,
            "destinationID": 19,
            "travelers": 5,
            "date": "2022/12/19",
            "duration": 19,
            "status": "approved",
            "suggestedActivities": []}]
        )
    })

})