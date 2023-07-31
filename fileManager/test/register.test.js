const { expect } = require('chai');
const request = require('supertest');
const { app, server } = require('../index'); // Import both app and server from index.js

// ... Your test cases ...

describe('User Registration API', () => {
  it('should register a new user and return the user object', (done) => {
    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'testpassword',
    };

    request(app)
      .post('/api/register')
      .send(newUser)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('username', newUser.username);
        expect(res.body).to.have.property('email', newUser.email);
        expect(res.body).to.have.property('password'); // Ensure password is not returned in the response
        done();
      });
  });

  // Add more test cases for edge cases and error scenarios
});
