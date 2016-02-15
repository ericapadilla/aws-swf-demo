var swf = require('../../index').awsSwf;

var activityPoller = new swf.ActivityPoller({
    domain: 'v-air',
    taskList: { name: 'verify-flight-details-activity-task-list' },
    identity: 'verify-flight-details-poller ' + process.pid
});

activityPoller.on('activityTask', function(task) {
    console.log('Received new activity task (verify-flight-details)!');
    var output = task.input;

    setTimeout(function() {
        task.respondCompleted(output, function (err) {
            if(err) {
                console.log(err);
                return;
            }
            console.log('Verified flight details!');
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
