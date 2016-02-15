var awsSwf = require('aws-swf');
var config = require('./config.json');

awsSwf.AWS.config = new awsSwf.AWS.Config(config);

module.exports = {
    awsSwf: awsSwf
};