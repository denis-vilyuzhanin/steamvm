
const nearley = require("nearley");
const assert = require('assert')
const fs = require('fs')
const path = require('path')
const grammar = require("../steam-grammar-generated");

const INPUT_SUFFIX = '.input.steam'
const OUTPUT_SUFFIX = '.output.json'

describe('steam language grammar baseline test', () => {
	var parser;
	beforeEach(() =>{
		
	});
	
	scanDirectory(path.join(__dirname, 'grammar'));
});

function scanDirectory(directory) {
	var files = fs.readdirSync(directory);
	
	files.filter((file) => file.endsWith(INPUT_SUFFIX))
         .forEach(function(file){
			var testName = file.substring(0, file.indexOf(INPUT_SUFFIX));
			var inputFile = path.join(directory, file);
			var outputFile = path.join(directory,testName + OUTPUT_SUFFIX);
			if (fs.statSync(outputFile).isFile()) {
				it(testName, parseAndCompare(inputFile, outputFile));	
			} else {
				console.log("[WARNING] Can't find output file for ", file);
			}
	});
	files.filter((file) => fs.statSync(path.join(directory, file)).isDirectory())
	     .forEach(function(file){
	        describe(file, () => {
			    scanDirectory(path.join(directory, file))
			});
	     });
}

function parseAndCompare(inputFile, outputFile) {
	return () => {
		var steamCode = fs.readFileSync(inputFile, 'utf8');
		var expectedParsedTree = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
		var parser = new nearley.Parser(grammar.ParserRules, grammar.ParserStart);
		parser.feed(steamCode);
		assert.deepEqual(expectedParsedTree, parser.results);
	}
}
