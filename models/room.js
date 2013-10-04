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
	player.id = this.players.length + 1;
	this.players.push(player);
	this.update = new Date().getTime();

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
		str += p + '    ' + this.players[p].name + '\n';
	}
	str += '--------';
	if(this.playerNum == this.players.length){
		str += '小伙伴都到齐啦，Let\'s go。';
	}else{
		str += '还有 '+(this.playerNum - this.players.length)+' 个小伙伴没进来！';
	}
	return str;
}

module.exports = Room;