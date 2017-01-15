var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');


// Instantiate a Mocha instance.
var mocha = new Mocha();


if (process.argv.length < 3) {
	discoverAllTests(__dirname);
} else {
	var target = process.argv[2];
	if (!fs.statSync(target).isDirectory()) {
		mocha.addFile(path.join(__dirname, target));
	} else {
		discoverAllTests(target);
	}
	
}


// Run the tests.
mocha.run(function(failures){
  process.on('exit', function () {
    process.exit(failures);  // exit with non-zero status if there were failures
  });
});

function discoverAllTests(directory) {
	
	// Add each .js file to the mocha instance
	fs.readdirSync(directory).filter(function(file){
	    // Only keep the .js files
		//console.log(file);
		const suffix = '.test.js'
	    return file.substr(-1 * suffix.length) === suffix;

	}).forEach(function(file){
	    mocha.addFile(
	        path.join(directory, file)
	    );
	});
}