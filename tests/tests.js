const request = require('supertest');
const app = require('../app/app');  
const User = require('../app/models/Users');  // Import the User model
const { expect } = require('chai');

const testUserData = {
    name: "Test User",
    email: "testuser@example.com",
    password: "testpassword123",
};
const testMovieData = {
    title: "Test Movie",
    year: 2021,
    cast: "Test Actor",
    genres: ["Action", "Adventure"],
    extract: "Test Extract",
    thumbnail: "https://example.com/test.jpg",
    thumbnail_width: 200,
    thumbnail_height: 300
};
const adminUser = { name: 'Admin User', email: 'admin@example.com', password: 'adminpassword', role: 'admin' };

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

// wrong password

it('should return error for invalid credentials', async () => {
    const res = await request(app)
        .post('/api/auth/login')
        .send({
            email: testUserData.email,
            password: 'wrongpassword'
        });
    
    expect(res.status).to.equal(400);  
    expect(res.body).to.have.property('message', 'Invalid password');
});

// add movie test

it('should add a new movie when the admin is authenticated', async () => {
    // Register and login an admin
    
    await request(app)
        .post('/api/auth/register')
        .send(adminUser);
    
    const loginRes = await request(app)
        .post('/api/auth/login')
        .send({ email: adminUser.email, password: adminUser.password });
    
    const token = loginRes.body.token;
    const res = await request(app)
        .post('/api/admin/addMovie')
        .set('Authorization', `Bearer ${token}`)
        .send(testMovieData);

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('message', 'Movie added successfully');
});

//no token 
it('should not allow adding a movie without JWT token', async () => {
    const movieData = {
        title: 'New Movie',
        year: 2025,
        cast: ['Actor A', 'Actor B'],
        genres: ['Action'],
        extract: 'An action-packed movie',
        thumbnail: 'https://example.com/newmovie.jpg',
        thumbnail_width: 220,
        thumbnail_height: 326
    };

    const res = await request(app)
        .post('/api/admin/addMovie')
        .send(movieData);

    expect(res.status).to.equal(401);  
    expect(res.body).to.have.property('message', 'Access denied');
});
it('should return movies based on search query', async () => {
    await request(app)
        .post('/api/movies')
        .send(testMovieData);
    
    const res = await request(app)
        .get('/api/movies/search')
        .query({ title: 'The Life of David Gale' });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0]).to.have.property('title', 'The Life of David Gale');
});
it('should return an empty array if no movies match the search query', async () => {
    const res = await request(app)
        .get('/api/movies/search')
        .query({ title: 'NonExistingMovie' });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array').that.is.empty;
});


});
