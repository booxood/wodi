var crypto = require('crypto');
var config = require('../config');
var util = require('../util');

var writeLog = util.writeLog;
var logPath = config.logPath;
var wxTextRes = util.wxTextRes;

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
	res.send('where are you from');
};

exports.post = function(req, res){
	writeLog(logPath, 'post', 'req.url:'+req.url);

	for(var i in req.body.xml){
		console.log(i+'------'+req.body.xml[i]);
	}
	var msg = req.body.xml;
	var str = wxTextRes(msg.FromUserName, 
				msg.ToUserName,
				'收到你发过来的'+msg.Content);
	console.log('-------reponse:' + str);
	res.send(str);
};