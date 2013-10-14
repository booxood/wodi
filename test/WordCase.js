var Word = require('../models/word');

var word = new Word();

describe('WordCase', function(){

	it('should return Word instance', function(){
		word.should.be.an.instanceof(Word);
	});

	it('should return array and length equal 3', function(){
		Word.random().should.be.an.instanceof(Array);
		Word.random().length.should.equal(3);
	});
});