var expect  = require('chai').expect;
var request = require('request');


describe('User Functionalities', function() {
    describe ('Main page', function() {
        it(' Main status', function(done){
            request('http://localhost:5001/', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });

    describe ('Activate page', function() {
        it('Activate status', function(done){
            request('http://localhost:5001/activate', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
});

describe('Student Functionalities', function() {
    describe ('Profile page', function() {
        it('Profile status', function(done){
            request('http://localhost:5001/studentProfile', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Edit Student Profile page', function() {
        it('Edit Student Profile status', function(done){
            request('http://localhost:5001/editStudentProfile', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Appointments page', function() {
        it('status', function(done){
            request('http://localhost:5001/landlordProfile', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('About page', function() {
        it('status', function(done){
            request('http://localhost:5001/landlordProfile', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('About page', function() {
        it('status', function(done){
            request('http://localhost:5001/landlordProfile', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
});
// postData = {},
//     postConfig = {},
//     postSuccessHandler = null;
//
// //create an object to send as POST data
// postData = {
//     username:'admin',
//     password:'admin',
// };
//
// //the config for our HTTP POST request
// postConfig = {
//     url:'http://localhost:5001/',
//     form: postData
// };
//
// //the HTTP POST request success handler
// postSuccessHandler = function (err, httpResponse, body) {
//     //look for this message in your JS console:
//     console.log('JSON response from the server: ' + body);
// };
//
// //make the POST request
// request.post(postConfig, postSuccessHandler);

