import chai from 'chai';
import User from '../src/User'

const expect = chai.expect;

describe('Trips', function() {
    let user1;
    let user2;

    const userData = [
        {
        "id": 1,
        "name": "Ham Leadbeater",
        "travelerType": "relaxer"
        },
        {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
        },
        {
        "id": 3,
        "name": "Sibby Dawidowitsch",
        "travelerType": "shopper"
        },
        {
        "id": 4,
        "name": "Leila Thebeaud",
        "travelerType": "photographer"
        },
        {
        "id": 5,
        "name": "Tiffy Grout",
        "travelerType": "thrill-seeker"
    }]

    beforeEach(function() {
        user1 = new User(userData[0]);
        user2 = new User(userData[1]);
    })

    it('should get a single traveler', function () {
        expect()
      })
    
    it('should get all upcoming trips', function () {
    
    })

    it('should get all pending trips', function () {
    
    })

    it('should return the total amount spent on trips this year', function () {
        //This should be calculated from the trips data and include a travel agent’s 10% fee
    })
})