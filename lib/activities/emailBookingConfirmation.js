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

console.log('                      _ _   _                 _    _             ');
console.log('  ___ _ __ ___   __ _(_) | | |__   ___   ___ | | _(_)_ __   __ _ ');
console.log(' / _ \\ \'_ ` _ \\ / _` | | | | \'_ \\ / _ \\ / _ \\| |/ / | \'_ \\ / _` |');
console.log('|  __/ | | | | | (_| | | | | |_) | (_) | (_) |   <| | | | | (_| |');
console.log(' \\___|_| |_| |_|\\__,_|_|_| |_.__/ \\___/ \\___/|_|\\_\\_|_| |_|\\__, |');
console.log('                                                           |___/ ');
console.log('                  __ _                      _   _             ');
console.log('  ___ ___  _ __  / _(_)_ __ _ __ ___   __ _| |_(_) ___  _ __  ');
console.log(' / __/ _ \\| \'_ \\| |_| | \'__| \'_ ` _ \\ / _` | __| |/ _ \\| \'_ \\ ');
console.log('| (_| (_) | | | |  _| | |  | | | | | | (_| | |_| | (_) | | | |');
console.log(' \\___\\___/|_| |_|_| |_|_|  |_| |_| |_|\\__,_|\\__|_|\\___/|_| |_|');

process.on('SIGINT', function () {
    console.log('Got SIGINT! Stopping activity poller after this request, Please wait...');
    activityPoller.stop();
});
