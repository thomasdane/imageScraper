var AWS = require('aws-sdk');

AWS.config.region = 'ap-southeast-2'

var s3bucket = new AWS.S3({params: {Bucket: 'partywave-images'}});

s3bucket.createBucket(function() {
	var params = {Key: 'myKey', Body: 'Hello'};
	s3bucket.upload(params, function(err, data){
		if(err) {
			console.log("error uploading data ", err);
		} else {
			console.log("success")
		}
	});
});


