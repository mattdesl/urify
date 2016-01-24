# urify

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

A simple module to synchronously return a DataURI for the given file path.

This also includes a browserify transform to statically analyze the expression, inlining the URI during the bundle step. This allows you to do the following in the browser:

```js
var path = require('path');
var urify = require('urify');
var uri = urify(path.join(__dirname, 'icon.png'));

var img = new Image()
img.onload = function() {
	console.log("Image loaded!")
}
img.src = uri
```

While bundling, include the `urify/transform` like so:

```browserify -t urify/transform foo.js > bundle.js```

After bundling, the code will look like this:

```js
var uri = "data:image/png;base64,....."

var img = new Image()
img.onload = function() {
  console.log("Image loaded!")
}
img.src = uri
```

## API Usage

[![NPM](https://nodei.co/npm/urify.png)](https://nodei.co/npm/urify/)

### `urify = require('urify')`
#### `uri = urify(file)`

Synchronously grabs a file's DataURI string, with the following format:

```js
"data:image/png;base64,....."
```

### `transform = require('urify/transform')`
#### `stream = transform(file, [opts])`

Returns a through stream inlining `require('urify')` calls to their statically evaluated DataURI strings. 

Optionally, you can set which `opt.vars` will be used in the [static-eval](https://www.npmjs.org/package/static-eval) in addition to `__dirname` and `___filename`. 

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/urify/blob/master/LICENSE.md) for details.
