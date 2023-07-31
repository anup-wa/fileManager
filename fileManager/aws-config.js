// aws-config.js
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'AKIAW6JPEX7SD6MPB46V',
  secretAccessKey: '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'
});

const s3 = new AWS.S3();

module.exports = s3;
