var Room = function(id, host){
	this.id = id;
	this.host = host;

	this.playerNum = 0;
	this.spyNum = 0;
	this.nullNum = 0;

	this.players = [];
	this.update = new Date().getTime();
}

Room.prototype.addPlayer = function(player){
	var str = '';
	if(this.playerNum <= this.players.length){
		str = '房间已经满了，小伙伴，你是被抛弃了，还是进错了？';
	}else{
		player.id = this.players.length+1;
		this.players.push(player);
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

	return '';
}

Room.prototype.status = function(){
	var str = '';
	str = '编号  昵称';
	for(var p in this.players){
		str += this.players[p].id + '    ' + this.players[p].name + '\n';
	}
	str += '--------';
	if(this.playerNum == this.players.length){
		str += '小伙伴都到齐啦，Let\'s go。';
	}else{
		str += '还有 '+(this.playerNum - this.players.length)+' 个小伙伴没进来！';
	}
	return str;
}

Room.prototype.expose = function(player){

}

module.exports = Room;