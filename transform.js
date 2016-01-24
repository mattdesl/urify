var staticModule = require('static-module');
var path = require('path');
var quote = require('quote-stream');
var urify = require('./');
var fromString = require('from2-string');
var PassThrough = require('readable-stream/passthrough');

module.exports = function urifyTransform (file, opts) {
  if (/\.json$/.test(file)) return new PassThrough();

  if (!opts) opts = {};
  var vars = opts.vars || {
    __filename: file,
    __dirname: path.dirname(file)
  };

  var sm = staticModule(
    { 'urify': urifyEscaped },
    { vars: vars, varModules: { path: path } }
  );
  return sm;

  function urifyEscaped (file) {
    var data = '';
    try {
      data = urify(file);
    } catch (err) {
      sm.emit('error', err);
    }
    return fromString(data).pipe(quote());
  }
};
