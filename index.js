'use strict';

var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper({ global: false })
	.src('https://raw.github.com/rbong/pandoc-bin/experimental/vendor/osx/pandoc', 'darwin')
	.src('https://raw.github.com/rbong/pandoc-bin/experimental/vendor/linux/x64/pandoc', 'linux', 'x64')
	.src('https://raw.github.com/rbong/pandoc-bin/experimental/vendor/win/pandoc.exe', 'win32')
	.dest(path.join(__dirname, 'vendor'))
	.use(process.platform === 'win32' ? 'pandoc.exe' : 'pandoc');

/**
 * Only run check if binary doesn't already exist
 */

fs.exists(bin.path(), function (exists) {
	if (!exists) {
		console.log(chalk.yellow('⧗ Downloading Pandoc (~20-50MB depending on OS). This may take a minute or so.'));
		bin.run(['--version'], function (err) {
			if (err) {
				console.log(chalk.red('✗ pre-build test failed'));
				console.log(chalk.red("⚠ I don't have a working binary for your system. If you believe I am incorrect about this or if you want to request a binary for your system, please file an issue on this module's github page. ⚠"));
				console.log(chalk.yellow('As an alternative to this module, please refer to http://johnmacfarlane.net/pandoc/installing.html for installing Pandoc on your system.'));
			} else {
				console.log(chalk.green('✓ pre-build test passed successfully'));
			}
		});
	}
});

/**
 * Module exports
 */

module.exports.path = bin.path();
