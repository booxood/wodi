var should = require('should');

var xml2js = require('xml2js');
var parser = xml2js.Parser();
var xmlbuilder = require('xmlbuilder');

var xmlStr = '<xml>\
<ToUserName><![CDATA[toUser]]></ToUserName>\
<FromUserName><![CDATA[fromUser]]></FromUserName>\
<CreateTime>123456789</CreateTime>\
<MsgType><![CDATA[text]]></MsgType>\
<Content><![CDATA[this is a test]]></Content>\
<MsgId>1234567890123456</MsgId>\
</xml>';

describe('parse xml', function(){
    it('parse xml', function(done){
        parser.parseString(xmlStr, function(err, json){
            should.not.exist(err);
            // console.dir(json);
            json.xml.should.be.an.instanceof(Object);
            var obj = json.xml;
            obj.ToUserName.should.instanceof(Array).lengthOf(1);
            obj.ToUserName[0].should.equal('toUser');
            obj.CreateTime[0].should.equal('123456789');
            done();
        });
    });
});

describe('build xml', function(){
    it('build xml', function(){
        var xml = xmlbuilder.create('xml')
            .ele('ToUserName')
            .dat('toUser')
            .up()
            .ele('FromUserName')
            .dat('fromUser')
            .up()
            .ele('CreateTime')
            .txt('123456789')
            .up()
            .ele('MsgType')
            .dat('text')
            .up()
            .ele('Content')
            .dat('this is a test')
            .up()
            .ele('MsgId')
            .txt('1234567890123456')
            .up();
        // console.log(xml);
        xml.should.be.instanceof(Object);
        xml.toString().should.equal(xmlStr);
    });
});