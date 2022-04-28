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
    describe ('Student Create Account page', function() {
        it('Student Create Account status', function(done){
            request('http://localhost:5001/studentCreateAccount', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Landlord Create Account page', function() {
        it('Landlord Create Account status', function(done){
            request('http://localhost:5001/landlordCreateAccount', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Reset Password page', function() {
        it('Reset Password status', function(done){
            request('http://localhost:5001/resetPassword', function(error, response, body) {
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
        it('Appointments status', function(done){
            request('http://localhost:5001/appointmentListStudents', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Message page', function() {
        it('Message status', function(done){
            request('http://localhost:5001/createMessage', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Student Messaging page', function() {
        it('Student Messaging status', function(done){
            request('http://localhost:5001/studentMessaging', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Student Messaging page', function() {
        it('Student Messaging status', function(done){
            request('http://localhost:5001/studentMessaging', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Roommate Matching Form page', function() {
        it('Roommate Matching Form status', function(done){
            request('http://localhost:5001/roommateMatchingForm', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Roommate Matching Form Edit page', function() {
        it('Roommate Matching Form Edit status', function(done){
            request('http://localhost:5001/roommateMatchingFormEdit', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Roommate Matching Results page', function() {
        it('Roommate Matching Results status', function(done){
            request('http://localhost:5001/roommateMatchingResults', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Property Search Students page', function() {
        it('Property Search Students status', function(done){
            request('http://localhost:5001/propertySearch', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Housing Profile page', function() {
        it('Housing Profile status', function(done){
            request('http://localhost:5001/housingProfile', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Create Sublet page', function() {
        it('Create Sublet status', function(done){
            request('http://localhost:5001/createSubletPage', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
});

describe('Landlord Functionalities', function() {
    describe ('Landlord Profile page', function() {
        it(' Landlord Profile status', function(done){
            request('http://localhost:5001/landlordProfile', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });

    describe ('Landlord Create Listings page', function() {
        it('Landlord Create Listings status', function(done){
            request('http://localhost:5001/createListingPage', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Create Message page', function() {
        it('Create Message status', function(done){
            request('http://localhost:5001/createMessage', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Landlord Housing Profile page', function() {
        it('Landlord Housing Profile status', function(done){
            request('http://localhost:5001/housingProfileForLandlords', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Landlord Messaging page', function() {
        it('Landlord Messaging status', function(done){
            request('http://localhost:5001/landlordMessaging', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
    describe ('Landlord Property Search page', function() {
        it('Landlord Property Search status', function(done){
            request('http://localhost:5001/propertySearchLandlords', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
    describe ('Landlord View Listing page', function() {
        it('Landlord View Listingstatus', function(done){
            request('http://localhost:5001/viewLandlordListings', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });
    });
});

describe('Admin Functionalities', function() {
    describe ('Admin Landing page', function() {
        it('Admin Landing  status', function(done){
            request('http://localhost:5001/adminLanding', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });

    describe ('Admin Managing Listings page', function() {
        it('Admin Managing Listings  status', function(done){
            request('http://localhost:5001/adminManagingListings', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });
    describe ('Admin Managing Users page', function() {
        it('Admin Managing Users status', function(done){
            request('http://localhost:5001/adminManagingUsers', function(error, response, body) {
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

