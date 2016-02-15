var async = require('async');
var awsSwf = require('../index').awsSwf;
var swf = awsSwf.createClient();

async.auto({
    registerDomain: function(cb) {
        swf.registerDomain({
            name: 'v-air',
            description: 'domain for airline-related workflows',
            workflowExecutionRetentionPeriodInDays: '1'
        }, function (err, results) {
            if (err && err.code != 'DomainAlreadyExistsFault') {
                console.log('Unable to register domain: ', err);
                return cb(err);
            }
            console.log('Registered v-air domain.');
            cb();
        });
    },
    registerWorkflowType: [ 'registerDomain', function(cb) {
        swf.registerWorkflowType({
            domain: 'v-air',
            name: 'flight-booking',
            version: '0.1'
        }, function (err, results) {
            if (err && err.code != 'TypeAlreadyExistsFault') {
                console.log('Unable to register workflow: ', err);
                return cb(err);
            }
            console.log('Registered flight-booking workflow.');
            cb();
        });
    }],
    registerVerifyFlightDetailsActivity: [ 'registerWorkflowType', function(cb) {
        swf.registerActivityType({
            domain: 'v-air',
            name: 'verify-flight-details',
            version: '0.1',
            defaultTaskList : { name: 'verify-flight-details-activity-task-list' }
        }, function (err, results) {
            if (err && err.code != 'TypeAlreadyExistsFault') {
                console.log('Unable to register activity type: ', err);
                return cb(err);
            }
            console.log('Registered verify-flight-details activity.');
            cb();
        });
    }],
    registerProcessPaymentActivity: [ 'registerWorkflowType', function(cb) {
        swf.registerActivityType({
            domain: 'v-air',
            name: 'process-payment',
            version: '0.1',
            defaultTaskList : { name: 'process-payment-activity-task-list' }
        }, function (err, results) {
            if (err && err.code != 'TypeAlreadyExistsFault') {
                console.log('Unable to register activity type: ', err);
                return cb(err);
            }
            console.log('Registered verify-flight-details activity.');
            cb();
        });
    }],
    registerEmailBookingConfirmationActivity: [ 'registerWorkflowType', function(cb) {
        swf.registerActivityType({
            domain: 'v-air',
            name: 'email-booking-confirmation',
            version: '1.0',
            defaultTaskList : { name: 'email-booking-confirmation-activity-task-list' }
        }, function (err, results) {
            if (err && err.code != 'TypeAlreadyExistsFault') {
                console.log('Unable to register activity type: ', err);
                return cb(err);
            }
            console.log('Registered email-booking-confirmation activity.');
            cb();
        });
    }]
}, function(err) {
    if (err) {
        console.log('Encountered error while initializing: ', err);
        return;
    }
    console.log('Registration successful!');
});