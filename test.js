var xml2js = require('xml2js');
var parsestring = xml2js.parsestring;

var xml = '<xml>\
 <ToUserName><![CDATA[toUser]]></ToUserName>\
 <FromUserName><![CDATA[fromUser]]></FromUserName> \
 <CreateTime>1348831860</CreateTime>\
 <MsgType><![CDATA[text]]></MsgType>\
 <Content><![CDATA[this is a test]]></Content>\
 <MsgId>1234567890123456</MsgId>\
 </xml>';

 parsestring(xml, function(err, json){
 	if(err){
 		console.log('err:'+err);
 	}else{
 		console.log('json:'+json);
 	}
 });