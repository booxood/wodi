var Room = function(id, host){
	this.id = id;
	this.host = host;

	this.playerNum = 6;
	this.spyNum = 1;
	this.nullNum = 0;

	this.players = [];
	this.update = new Date().getTime();
}

Room.prototype.addPlayer = function(player){
	player.id = this.player.length + 1;
	this.players.push(player);
	this.update = new Date().getTime();

	// Event.emitor('add')
}

module.exports = Room;