'use strict';

var BinBuild = require('bin-build');
var BinWrapper = require('bin-wrapper');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

/**
 * Initialize a new BinWrapper
 */

var bin = new BinWrapper({ global: false })
	.src('https://raw.github.com/toshgoodson/pandoc-bin/0.0.0/vendor/osx/pandoc', 'darwin')
	.src('https://raw.github.com/toshgoodson/pandoc-bin/0.0.0/vendor/linux/x86/pandoc', 'linux', 'x86')
	.src('https://raw.github.com/toshgoodson/pandoc-bin/0.0.0/vendor/linux/x64/pandoc', 'linux', 'x64')
	.src('https://raw.github.com/toshgoodson/pandoc-bin/0.0.0/vendor/win/pandoc.exe', 'win32')
	.dest(path.join(__dirname, 'vendor'))
	.use(process.platform === 'win32' ? 'pandoc.exe' : 'pandoc');

/**
 * Only run check if binary doesn't already exist
 */

fs.exists(bin.use(), function (exists) {
	if (!exists) {
		console.log(chalk.yellow('⧗ Downloading Pandoc (~20-50MB depending on OS). This may take a minute or so.'));
		bin.run(['--version'], function (err) {
			if (err) {
				console.log(chalk.red('✗ pre-build test failed, compiling from source...'));

				console.log(chalk.yellow('⚠ Building Pandoc from source requires the [Haskell platform]. This available from https://www.haskell.org/platform/.'));

				exec('cabal update', function (error, stdout, stderr) {
					exec('cabal install hsb2hs', function (error, stdout, stderr) {
						exec('cabal install --flags="embed_data_files" pandoc', function (error, stdout, stderr) {

						});
					});
				});
				// var builder = new BinBuild()
				// 	.src('http://downloads.sourceforge.net/project/optipng/OptiPNG/optipng-0.7.5/optipng-0.7.5.tar.gz')
				// 	.cfg('./configure --with-system-zlib --prefix="' + bin.dest() + '" --bindir="' + bin.dest() + '"')
				// 	.make('make install');

				// return builder.build(function (err) {
				// 	if (err) {
				// 		return console.log(chalk.red('✗ ' + err));
				// 	}
				//
				// 	console.log(chalk.green('✓ optipng built successfully'));
				// });
			}

			console.log(chalk.green('✓ pre-build test passed successfully'));
		});
	}
});

/**
 * Module exports
 */

module.exports.path = bin.use();
