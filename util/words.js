var words = [
['王菲','那英'],
['元芳','展昭']
];

var Words = function(){

}

Words.random = function(){
	var len = words.length;
	var index = Math.floor(Math.random()*len);
	return words[index].push('万中无一的白板');
}

module.exports = Words;