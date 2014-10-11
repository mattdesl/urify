# urify

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This is a browserify transform stream to statically analyze [datauri](https://www.npmjs.org/package/datauri) expressions, inlining them during the bundle step. This allows you to do the following in the browser:  

```js
var datauri = require('datauri')
var uri = datauri(__dirname+'/icon.png')

var img = new Image()
img.onload = function() {
	console.log("Image loaded!")
}
img.src = uri
```

Upon bundling:

```browserify -t urify foo.js > bundle.js```

And the bundled file will have code that looks like this:

```js
var uri = "data:image/png;base64,....."
```

## API Usage

[![NPM](https://nodei.co/npm/urify.png)](https://nodei.co/npm/urify/)

For using this module directly, without browserify.

#### `urify(file, opt)`

Returns a through stream inlining `datauri()` calls in-place. 

Optionally, you can set which `opt.vars` will be used in the [static-eval](https://www.npmjs.org/package/static-eval) in addition to `__dirname` and `___filename`. 

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/urify/blob/master/LICENSE.md) for details.
