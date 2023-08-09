// aws-config.js
const AWS = require('aws-sdk');

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'NULL',
  secretAccessKey: 'Null'
});

const s3 = new AWS.S3();

module.exports = s3;
