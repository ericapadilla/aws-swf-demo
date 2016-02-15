var swf = require('../../index').awsSwf;

var activityPoller = new swf.ActivityPoller({
    domain: 'v-air',
    taskList: { name: 'email-booking-confirmation-activity-task-list' },
    identity: 'email-booking-confirmation-poller ' + process.pid
});

activityPoller.on('activityTask', function(task) {
    console.log('Received new activity task (email-booking-confirmation)!');
    var output = task.input;

    setTimeout(function() {
        task.respondCompleted(output, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Emailed booking confirmation!');
        });
    }, 5000);
});

activityPoller.on('poll', function(d) {
    //console.log('Polling for activity tasks...', d);
});

// Start polling
activityPoller.start();

process.on('SIGINT', function () {
    console.log('Got SIGINT! Stopping activity poller after this request, Please wait...');
    activityPoller.stop();
});
