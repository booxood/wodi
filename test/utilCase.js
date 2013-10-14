var util = require('../util');
var should = require('should');

describe('utilCase', function(){

	describe('isNum', function(){
		it('should return true', function(){
			util.isNum('123').should.equal(true);
		});
		it('should return false', function(){
			util.isNum('123q').should.equal(false);
		});
	});

	describe('randomNum', function(){
		it('should not return 0', function(){
			util.randomNum(1).should.not.equal(0);
		});
	});

	describe('trim', function(){
		it('should return qq', function(){
			util.trim('   qq   ').should.equal('qq');
		});
	});
});

