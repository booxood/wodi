var crypto = require('crypto');
var config = require('../config');
var util = require('../util');
var Room = require('../models/room');

var writeLog = util.writeLog;
var wxTextRes = util.wxTextRes;
var isNum = util.isNum;
var randomNum = util.randomNum;


var rooms = {};

var WODI_RULE_0 = '
发送:
wodi 玩家数 卧底人数 白板人数
到微信,例如:
wodi 8 2 0';

exports.checkToken = function(req, res, next){

    var signature = req.query['signature'];
    var timestamp = req.query['timestamp'];
    var nonce = req.query['nonce'];
    var echostr = req.query['echostr'];

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
    res.send('where are you from ?');
};

exports.post = function(req, res){
    for(var i in req.body.xml){
        console.log(i+'------'+req.body.xml[i]);
    }
    var msg = req.body.xml;
    var resStr = '';
    if(msg.Content == 'wodi'){
        resStr = wxTextRes(msg.FromUserName, 
            msg.ToUserName,
            WODI_RULE_0);
    }else if(msg.Content.indexOf('wodi') == 0){
        var cmd = msg.Content.split(' ');
        if(cmd.length == 4){
            if(isNum(cmd[1]) && isNum(cmd[2]) && isNum(cmd[3])){
                var id = randomNum(4);
                var room = new Room(id, msg.FromUserName);
                room.playerNum = cmd[1];
                room.spyNum = cmd[2];
                room.nullNum = cmd[3];
                rooms[id] = room;

                resStr = '房间创建成功，ID:'+id+';让小伙伴们发送：wodi 房间ID 昵称;例如：\n'+
                        'wodi '+id+' 小白';
            }else{
                resStr = wxTextRes(msg.FromUserName, 
                                msg.ToUserName,
                                '你想干嘛？玩 谁是卧底 吗？是的话，请按步骤一步一步来。\n'+WODI_RULE_0);
            }
        }

    }else{
        resStr = wxTextRes(msg.FromUserName, 
            msg.ToUserName,
            '收到你发过来的:'+msg.Content);
    }

    // console.log('-------reponse:' + resStr);
    res.send(resStr);
};