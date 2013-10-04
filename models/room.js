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
	}else if(this.spyNum > 0 && this.nullNum >= 0){
		return '卧底数 和 白板数 太少';
	}else if(this.playerNum <= this.spyNum + this.nullNum){
		return '都是卧底和白板怎么玩？';
	}

	return '';
}

module.exports = Room;