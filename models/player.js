var Player = function(wxid, name){
	this.wxid = wxid;
	this.name = name;

	this.id  = 0;
	this.role = 0;//0:plice,1:spy,2:null
    this.out = 0;
}

module.exports = Player;