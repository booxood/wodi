var words = [
['王菲','那英'],
['元芳','展昭']
];

var Word = function(){

}

Word.random = function(){
	var len = words.length;
	var index = Math.floor(Math.random()*len);
	var arr = words[index];
	arr.push('万中无一的白板');
	return arr;
}

// console.log(Words.random());

module.exports = Word;

