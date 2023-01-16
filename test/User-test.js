import chai from 'chai';
import User from '../src/User'

const expect = chai.expect;

describe('See if the tests are running', function() {
    let user1;
    beforeEach(function() {
        user1 = new User();
    })

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    expect(user1).to.be.an.instanceOf(User);
  })

  it('should get a single traveler', function () {

  })

  it('should get all past trips', function () {

  })

  it('should get all upcoming trips', function () {

  })

  it('should get all pending trips', function () {

  })




});
