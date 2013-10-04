var Player = function(wxid, name){
	this.wxid = wxid;
	this.name = name;

	this.id  = 0;
	this.role = 0;//0:killed,1:plice,2:spy,3:null
}

Player.prototype.expose = function(){
    var str = '';
    this.role = 0;
}

module.exports = Player;