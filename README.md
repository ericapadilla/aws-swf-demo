# aws-swf-demo
Amazon Simple Workflow Service Demo Application in Node.js

The demo application aims to demonstrate the data exchange and interaction among SWF actors (workflow starter, decider, and activity workers). It builds from [aws-swf](https://github.com/neyric/aws-swf) module to implement application components.

### Demo Workflow
Follows the illustrated flight booking workflow below
![Workflow](https://googledrive.com/host/0B07e7RS26I3TN1BjbHJHM3g5Z2M)

### SWF Architecture
![SWF](https://googledrive.com/host/0B07e7RS26I3Tc2Vkb2JGM3E5eWM)

### Requirements
 * [node.js](http://nodejs.org/) >= 0.8
 * An active [AWS account](http://aws.amazon.com/) with [Access Keys](http://docs.amazonwebservices.com/AWSSecurityCredentials/1.0/AboutAWSCredentials.html#AccessKeys)

### Installation
(1) Clone repository
```
git clone git@github.com:ericapadilla/aws-swf-demo.git
```
(2) Install dependencies
```
npm install
```
(3) Copy the sample configuration and replace with your own access keys
```
cp config.js.sample config.js
vim config.js
```
(4) Register the domain, workflow type and activity types
```
npm run bootstrap
```
(5) Run the decider
```
npm run decider
```
(6) Run the activities
```
npm run verifyFlightDetails
```
```
npm run processPayment
```
```
npm run emailBookingConfirmation
```
(7) Start workflow execution
```
npm run starter
```
