var crypto = require('crypto');
var config = require('../config');
var util = require('../util');

var writeLog = util.writeLog;
var logPath = config.logPath;


exports.checkToken = function(req, res, next){

	var signature = req.query['signature'];
	var timestamp = req.query['timestamp'];
	var nonce = req.query['nonce'];
	var echostr = req.query['echostr'];
	writeLog(logPath, 'checkToken',[signature,timestamp,nonce,echostr].join(';'));
	var keys = [];
	keys.push(nonce);
	keys.push(timestamp);
	keys.push(config.token);
	keys.sort();

	var sha1 = crypto.createHash('sha1');
	sha1.update(keys.join(''), 'utf8');
	var result = sha1.digest('hex')

	if(signature == result){
		if(req.method == 'GET')
			return res.end(echostr);
		next();
	}else{
		return res.end('403...');
	}
}


exports.get = function(req, res){
	writeLog(logPath, 'get', 'req.url:'+req.url);
	res.render('index', { title: 'Express' });
};

exports.post = function(req, res){
	writeLog(logPath, 'post', 'req.url:'+req.url);
	writeLog(logPath, 'post', 'req.body:'+req.body);
	for(var i in req.body){
		console.log('---req.body:' + req.body[i].toString());		
	}
	res.send('ok', 200);
};