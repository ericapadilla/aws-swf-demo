var swf = require('../index').awsSwf;

var workflow = new swf.Workflow({
    domain: 'v-air',
    workflowType: {
        name: 'flight-booking',
        version: '0.1'
    },
    executionStartToCloseTimeout: '1800',
    taskStartToCloseTimeout: '1800',
    taskList: { name: 'flight-booking-decision-task-list' },
    childPolicy: 'TERMINATE'
});

workflow.start({ input: 'data' }, function (err, runId) {
    if (err) {
        console.log('Cannot start workflow: ', err);
        return;
    }
    console.log('Workflow started: ' + runId);
});