var swf = require('../../index').awsSwf;

var activityPoller = new swf.ActivityPoller({
    domain: 'v-air',
    taskList: { name: 'process-payment-activity-task-list' },
    identity: 'process-payment-poller ' + process.pid
});

activityPoller.on('activityTask', function(task) {
    console.log('Received new activity task (process-payment)!');
    var output = task.input;

    setTimeout(function() {
        task.respondCompleted(output, function (err) {
            if (err) {
                console.log(err);
                return;
            }
            console.log('Processed payment!');
        });
    }, 5000);
});

activityPoller.on('poll', function(d) {
    //console.log('Polling for activity tasks...', d);
});

// Start polling
activityPoller.start();

console.log('                                                                            _   ');
console.log(' _ __  _ __ ___   ___ ___  ___ ___   _ __   __ _ _   _ _ __ ___   ___ _ __ | |_ ');
console.log('| \'_ \\| \'__/ _ \\ / __/ _ \\/ __/ __| | \'_ \\ / _` | | | | \'_ ` _ \\ / _ \\ \'_ \\| __|');
console.log('| |_) | | | (_) | (_|  __/\\__ \\__ \\ | |_) | (_| | |_| | | | | | |  __/ | | | |_ ');
console.log('| .__/|_|  \\___/ \\___\\___||___/___/ | .__/ \\__,_|\\__, |_| |_| |_|\\___|_| |_|\\__|');
console.log('|_|                                 |_|          |___/                          ');

process.on('SIGINT', function () {
    console.log('Got SIGINT! Stopping activity poller after this request, Please wait...');
    activityPoller.stop();
});
