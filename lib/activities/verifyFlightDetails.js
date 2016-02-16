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

console.log('                _  __          __ _ _       _     _         _      _        _ _     ');
console.log('__   _____ _ __(_)/ _|_   _   / _| (_) __ _| |__ | |_    __| | ___| |_ __ _(_) |___ ');
console.log('\\ \\ / / _ \\ \'__| | |_| | | | | |_| | |/ _` | \'_ \\| __|  / _` |/ _ \\ __/ _` | | / __|');
console.log(' \\ V /  __/ |  | |  _| |_| | |  _| | | (_| | | | | |_  | (_| |  __/ || (_| | | \\__ \\');
console.log('  \\_/ \\___|_|  |_|_|  \\__, | |_| |_|_|\\__, |_| |_|\\__|  \\__,_|\\___|\\__\\__,_|_|_|___/');
console.log('                      |___/           |___/                                         ');


process.on('SIGINT', function () {
    console.log('Got SIGINT! Stopping activity poller after this request, Please wait...');
    activityPoller.stop();
});
