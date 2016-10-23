var AWS = require('aws-sdk');
var request = require('request');

var scrapeImage = function(context) {
	
	AWS.config.loadFromPath('config.json');
	var s3bucket = new AWS.S3({params: {Bucket: 'partywave-images'}});
	var options = {
		uri: 'http://i.imgur.com/0cIbmeM.png', //not to spam while testing
		//uri: 'http://res3.seabreeze.com.au/images/forecast/2/syd1/grg.png', 
		encoding: null
	}

	request(options, function (error, response, body){
		if(error || response.statusCode !==200){
			console.log("failed to get image", error);
		} else {
			s3bucket.putObject({
				Body: body, 
				Key: 'seabreeze', 
				Bucket: 'partywave-images',
				ContentType: 'image/png',
				ACL: 'public-read'
			}, function(error, data){
				if (error) {
					console.log("error saving image to S3", error);
				} else {
					context.done(null, "success uploading image");					
				}
			});
		}
	})
}

exports.handler = function(event, context, callback) {
	scrapeImage(context);
};


