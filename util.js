var fs = require('fs');
var xml2js = require('xml2js');

var accessLogFile = fs.createWriteStream('access.log', {
    flags: 'a'
});

function mime(req){
	var type = req.headers['content-type'] || '';
	return type.split(';')[0];
};

var parseXmlBody = function(req, res, next){
	console.log('--------parseXmlBody------' + req._body);
	console.log('--------parseXmlBody------' + mime(req));

	// if(req._body)
	// 	return next();

	if(req.method == 'GET' ||
		req.method == 'HEAD')
		return next();

	req.body = req.body || {};

	if(mime(req) != 'text/xml')
		return next();
	// req._body = true;

	var buf = '';
	req.setEncoding('utf8');
	req.on('data', function(chunk){
		console.log('------- data ------');
		data += chunk;
	});
	req.on('end', function(){
		console.log('---POST---BODY:' + buf);
		var parsestring = xml2js.parsestring;
		parsestring(buf, function(err, json){
			if(err){
				err.status = 400;
				next(err);
			}else{
				req.body = json;
				next();
			}
		});
	});
};	

var writeLog = function(logPath, prefix, log){
	fs.appendFile(logPath, '\n['+prefix+']'+log, 
		function(err){
		if(err)
			return res.end('write file error...');
	});	
}

exports.accessLogFile = accessLogFile;
exports.parseXmlBody = parseXmlBody;
exports.writeLog = writeLog;