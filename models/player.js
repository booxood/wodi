var Player = function(wxid, name){
	this.wxid = wxid;
	this.name = name;

	this.id  = 0;
	this.role = 0;
}

Player.prototype.expose = function(){
    
}

module.exports = Player;