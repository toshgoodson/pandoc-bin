# pandoc-bin [![Build Status](https://secure.travis-ci.org/toshgoodson/pandoc-bin.svg?branch=master)](http://travis-ci.org/toshgoodson/pandoc-bin)

[Pandoc](https://github.com/jgm/pandoc) 1.12.4.2 Node.js wrapper that makes it seamlessly available as a local dependency on OS X, Linux, and Windows.

> If you need to convert files from one markup format into another, pandoc is your swiss-army knife.


## Install

```bash
$ npm install --save pandoc-bin
```


## Usage

```js
var execFile = require('child_process').execFile;
var optipng = require('pandoc-bin').path;

execFile(optipng, ['-v'], function (err, stdout, stderr) {
    console.log('Pandoc version:', stdout.match(/\d+\.\d+\.\d+(\.\d+)?/)[0]);
});
```


## CLI

```bash
$ npm install --global pandoc-bin
```

```bash
$ pandoc --help
```

## Caveats

This module has had very little testing outside of very narrow operating conditions (development on OS X, use on Ubuntu CI server).
I am still busy getting tests set up with Travis CI.


## License

Everything excluding the binaries licensed under the [MIT license](http://opensource.org/licenses/MIT).

Pandoc is licensed under the [GPL v2](http://www.gnu.org/licenses/gpl-2.0.html) and copyright John MacFarlane and the Contributing Authors.
