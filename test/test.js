/*global afterEach, beforeEach, describe, it */
'use strict';

var assert = require('assert');
var binCheck = require('bin-check');
var BinBuild = require('bin-build');
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var rm = require('rimraf');

describe('pandoc()', function () {
	afterEach(function (cb) {
		rm(path.join(__dirname, 'tmp'), cb);
	});

	beforeEach(function (cb) {
		fs.mkdir(path.join(__dirname, 'tmp'), cb);
	});

	it('should return path to binary and verify that it is working', function (cb) {
		var binPath = require('../').path;

		binCheck(binPath, '--version', function (err, works) {
			cb(assert.equal(works, true));
		});
	});

	it('should convert markdown to html5', function (cb) {
		var binPath = require('../').path;
		var args = [
			'-f', 'markdown',
			'-t', 'html',
			'-s',
			'-o', path.join(__dirname, 'tmp/test.html'),
			path.join(__dirname, 'fixtures', 'test.md')
		];

		spawn(binPath, args).on('close', function () {
			var html = fs.readFileSync(path.join(__dirname, 'tmp/test.html'), {encoding: 'utf8'});

			var correct = true;
			correct &= new RegExp('<h1 id="level-one-header">level one header</h1>').test(html);
			correct &= new RegExp('<h2 id="level-two-header">level two header</h2>').test(html);
			correct &= new RegExp('<h3 id="level-three-header">level three header</h3>').test(html);
			correct &= new RegExp('<p>general text</p>').test(html);

			cb(assert(correct));
		});
	});
});
