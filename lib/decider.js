var swf = require('../index').awsSwf;

var decider = new swf.Decider({
    domain: 'v-air',
    taskList: { name: 'flight-booking-decision-task-list'},
    identity: 'flight-booking-decider ' + process.pid,
    reverseOrder: false
});

decider.on('decisionTask', function (decisionTask) {
    //console.log('Got a new decision task!');

    var workflow = decisionTask.eventList;
    if(workflow.just_started()) {
        decisionTask.response.schedule({
            name: 'step1',
            activity: {
                name: 'verify-flight-details',
                version: '0.1'
            }
        }, { taskList: 'verify-flight-details-activity-task-list' });
        console.log('Scheduled verify-flight-details activity');
    } else if (workflow.has_activity_completed('step1') &&
        !workflow.is_activity_scheduled('step2')) {
        decisionTask.response.schedule({
            name: 'step2',
            activity: {
                name: 'process-payment',
                version: '0.1'
            }
        }, { taskList: 'process-payment-activity-task-list' });
        console.log('Scheduled process-payment activity');
    } else if (workflow.has_activity_completed('step2') &&
        !workflow.is_activity_scheduled('step3')) {
        decisionTask.response.schedule({
            name: 'step3',
            activity: {
                name: 'email-booking-confirmation',
                version: '0.1'
            },
        }, { taskList: 'email-booking-confirmation-activity-task-list' });
        console.log('Scheduled email-booking-confirmation activity');
    } else if (workflow.has_activity_completed('step1') &&
        workflow.has_activity_completed('step2') &&
        workflow.has_activity_completed('step3')) {
        decisionTask.response.stop({
            result: 'success'
        });
        console.log('Workflow has completed');
    } else {
        decisionTask.response.wait();
    }

    decisionTask.response.respondCompleted(decisionTask.response.decisions, function(err, result) {
        if (err) {
            console.log(err);
            return;
        }
    });

});

decider.on('poll', function(d) {
    //console.log('Polling for decision tasks...', d);
});

// Start polling
decider.start();

process.on('SIGINT', function () {
    console.log('Got SIGINT! Stopping decider poller after this request, Please wait...');
    decider.stop();
});