const request = require('supertest');
const app = require('../app/app');  
const User = require('../app/models/Users');  // Import the User model
const { expect } = require('chai');

const testUserData = {
    name: "Test User",
    email: "testuser@example.com",
    password: "testpassword123",
};
describe('User and Movie API Tests', function () {

    before(async () => {
        await User.deleteOne({ email: testUserData.email });
    });
    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUserData);
        
        expect(res.status).to.equal(201);  
        expect(res.body).to.have.property('message', 'User Registered Successfully!');
    });

    // Check if Password is Hashed
    it('If Password Dosent Match it IS Hashed', async () => {
        const user = await User.findOne({ email: testUserData.email });
        expect(user).to.not.be.null;
        expect(user.password).to.not.equal(testUserData.password);
    
    });


    it('should return error if user already exists', async () => {
        // 1st registration
        await request(app)
            .post('/api/auth/register')
            .send(testUserData);
        
        // 2nd registration
        const res = await request(app)
            .post('/api/auth/register')
            .send(testUserData);
        
        expect(res.status).to.equal(400);  
        expect(res.body).to.have.property('message', 'User already exists');
    });



    // Login Test
    
it('should login the user successfully', async () => {
    await request(app)
        .post('/api/auth/register')
        .send(testUserData);
    
    const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: testUserData.email,
            password: testUserData.password
        });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message', 'Logged In');
    expect(res.body).to.have.property('token');
});


});
