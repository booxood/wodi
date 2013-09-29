var crypto = require('crypto');
var config = require('../config');

var fs = require('fs');

function writeLog(prefix, log){
	fs.appendFile(config.logPath, '\n['+prefix+']'+log, 
		function(err){
		if(err)
			return res.end('write file error...');
	});	
}

exports.checkToken = function(req, res, next){

	var signature = req.query['signature'];
	var timestamp = req.query['timestamp'];
	var nonce = req.query['nonce'];
	var echostr = req.query['echostr'];
	writeLog('checkToken',[signature,timestamp,nonce,echostr].join(';'));
	var keys = [];
	keys.push(signature);
	keys.push(timestamp);
	keys.push(config.token);
	keys.sort();

	var sha1 = crypto.createHash('sha1');
	// for(var key in keys){
	// 	sha1.update(key);
	// }
	sha1.update(keys.join(''), 'utf8');

	if(nonce == sha1.digest('hex')){
		if(req.method == 'GET')
			return echostr;
		next();
	}else{
		return res.end('403...');
	}
}


exports.get = function(req, res){
	res.render('index', { title: 'Express' });
};

exports.post = function(req, res){
	console.log('-----post------');
	console.log(req.body.signature);
	console.log(req.body.echostr);
	res.render('index', { title: 'Express' });	
};