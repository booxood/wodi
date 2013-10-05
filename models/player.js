var Player = function(wxid, name){
	this.wxid = wxid;
	this.name = name;

	this.id  = 0;
	this.role = 0;//1:plice,2:spy,3:null
    this.out = 0;
}

module.exports = Player;