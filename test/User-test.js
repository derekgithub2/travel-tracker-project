import chai from 'chai';
import User from '../src/User'

const expect = chai.expect;

describe('User', function() {
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

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user1).to.be.an.instanceOf(User);
  })

  it('should have an id', function () {
    expect(user1.id).to.equal(1)
  })



});
