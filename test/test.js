// const expect = require('chai').expect;
// const app = require('../app.js');
// //const request = require('request');
// var chai = require('chai'), chaiHttp = require('chai-http');
//
// chai.use(chaiHttp);
const app = require('../app.js');
const chai = require('chai');
const request = require('supertest');

const expect = chai.expect;

// //let's set up the data we need to pass to the login method
// const userCredentials = {
//     username: 'kris12345',
//     password: 'candycane'
// }
// //now let's login the user before we run any tests
// var authenticatedUser = request.agent(app);
//
// before(function(done){
//     authenticatedUser
//         .post('/')
//         .send(userCredentials)
//         .end(function(err, response){
//             expect(response.statusCode).to.equal(200);
//             expect('Location', '/studentProfile');
//             done();
//         });
// });
// describe('GET /profile', function(done){
// //addresses 1st bullet point: if the user is logged in we should get a 200 status code
//     it('should return a 200 response if the user is logged in', function(done){
//         authenticatedUser.get('/studentProfile')
//             .expect(200, done);
//     });
// //addresses 2nd bullet point: if the user is not logged in we should get a 302 response code and be directed to the /login page
//     it('should return a 302 response and redirect to /login', function(done){
//         request(app).get('/profile')
//             .expect('Location', '/studentProfile')
//             .expect(302, done);
//     });
// });
// it('GET Main page status', function(done) {
//     request('http://localhost:5001' , function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         done();
//     });
// });
//
// it('GET studentProfile', function(done) {
//     request('http://localhost:5001/studentProfile' , function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         done();
//     });
// });
// it('GET studentProfile', function(done) {
//     request('http://localhost:5001/studentProfile' , function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         done();
//     });
// });
//
// it('GET studentProfile', function(done) {
//     request('http://localhost:5001/studentProfile' , function(error, response, body) {
//         expect(response.statusCode).to.equal(200);
//         done();
//     });
// });

// it('GET studentProfile', function() {   // <= No done callback
//     chai.request('http://localhost:8080/studentProfile')
//         .get('/studentProfile')
//         //.auth('kris12345', 'candycane')
//         // .set('Accept', 'application/json')
//         // .expect('Content-Type', /json/)
//         .end(function(err, res) {
//             // if (err) return (err);
//             expect(res).to.have.status(200);    // <= Test completes before this runs
//         });
// });

// describe('GET Home', () => {
//     it('Should return Not found', (done) => {
//         chai
//             .request(app)
//             .get('/')
//             .end(function (err, res) {
//                 expect(res.statusCode).to.equal(200);
//                 done()
//             })
//     })
// })
//
// it('POST login', function() {   // <= No done callback
//     chai.request('http://localhost:8080/')
//         .post('/')
//         .send({username: 'kris12345', password:"candycane"})
//         .auth('kris12345', 'candycane')
//         // .set('Accept', 'application/json')
//         // .expect('Content-Type', /json/)
//         .end(function(err, res) {
//             // if (err) return (err);
//             expect(res).to.have.status(200);    // <= Test completes before this runs
//         });
// });

// describe('POST /users', function() {
//     it('responds with json', function(done) {
//         request(app)
//             .post('/users')
//             .send({name: 'john'})
//             .set('Accept', 'application/json')
//             .expect('Content-Type', /json/)
//             .expect(200)
//             .end(function(err, res) {
//                 if (err) return done(err);
//                 return done();
//             });
//     });
// });

// it('GET studentProfile', function(done) { // <= Pass in done callback
//     chai.request('http://localhost:5001/studentProfile')
//         .get('/studentProfile')
//         //.auth('kris12345', 'candycane')
//         // .set('Accept', 'application/json')
//         // .expect('Content-Type', /json/)
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             done();                               // <= Call done to signal callback end
//         });
// });

// it('GET studentProfile', function(done) { // <= Pass in done callback
//     chai.request('http://localhost:8080')
//         .get('/')
//         .end(function(err, res) {
//             expect(res).to.have.status(200);
//             done();                               // <= Call done to signal callback end
//         });
// });
//
// describe('Status and content', function() {
//     describe ('Main page', function() {
//         it('Get status', function(done){
//             // request('http://localhost:5001/', function(error, response, body) {
//             //     expect(response.statusCode).to.equal(200);
//             //     done();
//             // });
//             chai.request('http://localhost:5001/')
//
//                 // register request
//                 .post('/')
//
//                 // send user registration details
//                 .send({
//                     'username': 'kris12345',
//                     'password': '$2a$08$w/1NF7RQJy9wtteUh3dbrO95jmpTNkXD306M9cBo/23F.vNhwCh6e'
//                 })
//             .end((err, res) => { // when we get a resonse from the endpoint
//
//                 // in other words,
//                 // the res object should have a status of 201
//                 res.should.have.status(201);
//             });
//
//         });
//         it('Post status', function(done){
//             request('http://localhost:5001/', function(error, response, body) {
//
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });
//     });
//
//     describe ('Student Profile page', function() {
//         it('Get status', function(done){
//             request('http://localhost:5001/studentProfile', function(error, response, body) {
//                 expect(response.statusCode).to.equal(200);
//                 done();
//             });
//         });
//
//     });
//
//
// });

describe('API Tests', function() {
    it('should return version number', function(done) {
        request(app)
            .get('http://localhost:5001/')
            .end(function(err, res) {
                expect(res.body.version).to.be.ok;
                expect(res.statusCode).to.equal(200);
                done();
            });
    });
});

