var Word = require('./word');

var ROLE = ['平民','卧底','白板'];

var Room = function(id, host){
	this.id = id;
	this.host = host;

	this.playerNum = 0;
	this.spyNum = 0;
	this.nullNum = 0;

	this.players = [];
	this.roles = [];
	this.words = ['平民的密语','卧底的密语','万中无一的白板'];
	this.update = new Date().getTime();
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

Room.prototype.init = function(){
	for(var i=0;i<this.spyNum;i++){
		this.roles.push(1);
	}
	for(var i=0;i<this.nullNum;i++){
		this.roles.push(2);
	}
	var p = this.playerNum - this.spyNum - this.nullNum;
	for(var i=0;i<p;i++){
		this.roles.push(0);
	}

	this.roles = shuffle(this.roles);

	this.words = Word.random();
}

Room.prototype.addPlayer = function(player){
	var str = '';
	if(this.playerNum <= this.players.length){
		str = '房间已经满了，小伙伴，你是被抛弃了，还是进错了？';
	}else{
		player.id = this.players.length+1;
		player.role = this.roles[this.players.length];
		this.players.push(player);
		str = '加入房间（'+ this.id +'）成功，你的密语是：' + this.words[player.role];
		this.update = new Date().getTime();
	}

	return str;
	// Event.emitor('add')
}

Room.prototype.valid = function(){
	if(this.playerNum <= 2){
		return '玩家数 太少';
	}else if(this.spyNum <= 0 && this.nullNum < 0){
		return '卧底数 和 白板数 太少';
	}else if(this.playerNum <= this.spyNum + this.nullNum){
		return '都是卧底和白板怎么玩？';
	}
	this.update = new Date().getTime();
	return '';
}

Room.prototype.status = function(){
	var str = '';
	str = '编号  昵称\n';
	for(var p in this.players){
		str += this.players[p].id + '    ' + this.players[p].name + '\n';
	}
	str += '--------\n';
	if(this.playerNum == this.players.length){
		str += '小伙伴都到齐啦，Let\'s go。';
	}else{
		str += '还有 '+(this.playerNum - this.players.length)+' 个小伙伴没进来！';
	}
	this.update = new Date().getTime();
	return str;
}

Room.prototype.out = function(id){
	var str = '';
	if(id<=0 || id>this.playerNum){
		str = '小伙伴ID 不对！';
	}else if(this.players[id-1].out == 1){
		str = '这个小伙伴被揭穿一次还不够吗？';
	}else{
		this.players[id-1].out = 1;
		str = this.result();
	}
	
	this.update = new Date().getTime();
	return str;
}

Room.prototype.result = function(){
	var p = 0,s = 0,n = 0;
	var str = '';
	for(var i in this.players){
		console.log('========= :'+this.players[i].out+'-----:'+this.players[i].role);
		if(this.players[i].out == 0){
			switch(this.players[i].role){
				case 0:
					p += 1;
					break;
				case 1:
					s += 1;
					break;
				case 2:
					n += 1;
					break;
			}
		}
	}
	console.log('====p:'+p+'===== n:'+n+'   ==== s:'+s);
	if(n == 0 && s == 0){
		str = '卧底、白板都被找出，游戏结束!\n';
	}else if(n == 0 && s >= p){
		str = '卧底赢了！';
	}else if(s == 0 && n >= p){
		str = '白板赢了！';
	}if((s+n) >= p){
		str = '卧底、白板赢了！';
	}else{
		str = '这位小伙伴貌似被冤枉了！游戏继续！';
	}

	this.update = new Date().getTime();
	return str;
}

Room.prototype.over = function(){
	var str = '';
	for(var p in this.players){
		str += this.players[p].id + '  ' + this.players[p].name +
			'  ' + ROLE[this.players[p].role] + '\n';
	}
	return str;
}

module.exports = Room;