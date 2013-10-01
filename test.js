var xml2js = require('xml2js');
var parser = xml2js.Parser();

var xmlbuilder = require('xmlbuilder');

var xml = '<xml>\
 <ToUserName><![CDATA[toUser]]></ToUserName>\
 <FromUserName><![CDATA[fromUser]]></FromUserName> \
 <CreateTime>1348831860</CreateTime>\
 <MsgType><![CDATA[text]]></MsgType>\
 <Content><![CDATA[this is a test]]></Content>\
 <MsgId>1234567890123456</MsgId>\
 </xml>';

 parser.parseString(xml, function(err, json){
 	if(err){
 		console.log('err:'+err);
 	}else{
 		for(var j in json.xml){
 			console.log(j+':'+json.xml[j]);
 		}
 		
 	}
 });

 var str = xmlbuilder.create('xml')
 			.ele('ToUserName')
 			.dat('user')
 			.up()
 			.ele('FromUserName')
 			.dat('from')
 			.up()
 			.ele('Content')
 			.txt('hello')
 			.up();
 console.log('xml str:' + str);