'use strict';

require('dotenv').config();
var AWS = require('aws-sdk');
const SESConfig = {
  forcePathStyle: true,  // ??
  accessKeyId: process.env.AWS_ACCESS_KEY,
  accessSecretKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_DEFAULT_REGION  // "us-east-1"
}
AWS.config.update(SESConfig);
const bucketName = process.env.AWS_S3_BUCKET_NAME  // 'perfect-bucket';
const S3Config = {
  s3ForcePathStyle: true,  // Errors
  forcePathStyle: true,  // ??
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // '1234567890',
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // 'dorimeadmin',
  endpoint: 'http://localhost:4566'  // new AWS.Endpoint('http://localhost:4569')
}
var S3 = new AWS.S3(S3Config);

module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  }
};

module.exports.countFiles = (event, context, callback) => {
  var response = S3.listObjects(
    {
      Bucket: bucketName,
    }
  )
  console.log(response)
}

// module.exports.getFile = (event, context, callback) => {

// }

module.exports.addCsv = (event, context, callback) => {
  // var file_csv = document.getElementById();  // CSV
  // var cvs_name = file_csv.namespaceURI;

  var csvKey = encodeURIComponent("uwucsv") + '/';

  var upload = S3.putObject({
    Bucket: bucketName,
    Key: csvKey,
    Body: Buffer.from('test', 'utf-8')
  })

  var promise = upload.promise()

  promise.then(
    function(data){
      console.log("Successfully uploaded csv.");
    },
    function(err){
      return console.log(
        "There was an error uploading your csv: ",
        err.message
      );
    }
  );
}
