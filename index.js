var staticModule = require('static-module')
var path = require('path')
var through = require('through2')
var datauri = require('datauri')
var escape = require('js-string-escape')

module.exports = function (file, opts) {
    if (/\.json$/.test(file)) return through()
    if (module.exports.__emitter) return module.exports.__emitter(file, opts)

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
        return "'"+escape(data)+"'"
    }
}

//Currently a hack to get plugin architecture working
module.exports.__emitter = null