# pandoc-bin

[Pandoc](https://github.com/jgm/pandoc) 1.12.4.2 Node.js wrapper that makes it seamlessly available as a local dependency on OS X and Windows (Linux coming soon).

> OptiPNG is a PNG optimizer that recompresses image files to a smaller size, without losing any information.


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


## License

Everything excluding the binaries licensed under the [MIT license](http://opensource.org/licenses/MIT).

Pandoc is licensed under the [GPL v2](http://www.gnu.org/licenses/gpl-2.0.html) and copyright John MacFarlane and the Contributing Authors.
