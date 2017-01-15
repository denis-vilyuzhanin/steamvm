
const nearley = require("nearley");
const assert = require('assert')

const grammar = require("../steam-grammar-generated");

describe('steam language grammar', () => {
	var parser;
	beforeEach(() =>{
		parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
	});
	
	it('empty', () => {
		//when
		parser.feed('');
		//then
		//console.dir(parser.results[0][0][0][0].length)
		assert.deepEqual([[[[]]]], parser.results);
	});
	
	it('white space', () => {
		//when
		parser.feed('     ');
		//then
		//console.dir(parser.results[0][0][0][0].length)
		assert.deepEqual([[[['     ']]]], parser.results);
	});
	
	it('white space and tabs', () => {
		//when
		parser.feed('     \t   \t ');
		//then
		//console.dir(parser.results[0][0][0][0].length)
		assert.deepEqual([[[['     \t   \t ']]]], parser.results);
	});
});