var Room = function(id, host){
	this.id = id;
	this.host = host;

	this.playerNum = 6;
	this.spyNum = 1;
	this.nullNum = 0;

	this.players = {};
	this.update = new Date().getTime();
}


module.exports = Room;