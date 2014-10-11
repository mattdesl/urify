# urify

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

This is a browserify transform stream to statically analyze [datauri](https://www.npmjs.org/package/datauri) expressions and inlines them during the bundle step. This allows you to do the following in the browser:  

```js
var datauri = require('datauri')
var uri = datauri(__dirname+'/baboon.png')

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

## Usage

[![NPM](https://nodei.co/npm/urify.png)](https://nodei.co/npm/urify/)

## License

MIT, see [LICENSE.md](http://github.com/mattdesl/urify/blob/master/LICENSE.md) for details.
