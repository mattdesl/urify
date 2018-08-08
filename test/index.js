var test = require('tape').test;
var urify = require('../');
var path = require('path');
var browserify = require('browserify');
var vm = require('vm');

var file = path.join(__dirname, 'expected.b64');
var expected = require('fs').readFileSync(file, 'utf8');

test('bundles with inline uri', function (t) {
  t.plan(1);
  var uri = urify(path.join(__dirname, 'baboon.png'));
  t.equal(uri, expected, 'matches base64');
});

test('bundles with inline uri', function (t) {
  t.plan(1);

  var b = browserify();
  b.add(path.join(__dirname, 'basic.js'));
  b.transform(path.resolve(__dirname, '..', 'transform.js'));

  b.bundle(function (err, src) {
    if (err) t.fail(err);
    vm.runInNewContext(src, { console: { log: log } });
  });

  function log (msg) {
    t.equal(msg, expected);
  }
});

test('bundles with require.resolve', function (t) {
  t.plan(1);

  var b = browserify();
  b.add(path.resolve(__dirname, 'resolve.js'));
  b.transform(path.resolve(__dirname, '..', 'transform.js'));

  b.bundle(function (err, src) {
    if (err) t.fail(err);
    vm.runInNewContext(src, { console: { log: log } });
  });

  function log (msg) {
    t.equal(msg, expected);
  }
});
