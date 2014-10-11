var staticModule = require('static-module')
var path = require('path')
var through = require('through2')
var datauri = require('datauri')
var escape = require('js-string-escape')

module.exports = function (file, opts) {
    if (/\.json$/.test(file)) return through()
    if (!opts) opts = {}
    var vars = opts.vars || {
        __filename: file,
        __dirname: path.dirname(file)
    }
    
    var sm = staticModule(
        { 'datauri': urify },
        { vars: vars }
    )
    return sm
    
    function urify(file) {
        var data = datauri(file)
        var stream = through()
        stream.push("'"+escape(data)+"'")
        stream.push(null)
        return stream
    }
}