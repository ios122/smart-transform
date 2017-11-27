'use strict'

var path = require('path')
var CoffeeScript = null

exports.shouldCompile = function () {
  return true
}

exports.compile = function (sourceCode, filePath) {
  if (!CoffeeScript) {
    var previousPrepareStackTrace = Error.prepareStackTrace
    CoffeeScript = require('coffee-script')

    // When it loads, coffee-script reassigns Error.prepareStackTrace. We have
    // already reassigned it via the 'source-map-support' module, so we need
    // to set it back.
    Error.prepareStackTrace = previousPrepareStackTrace
  }

  if (process.platform === 'win32') {
    filePath = 'file:///' + path.resolve(filePath).replace(/\\/g, '/')
  }

  var output = CoffeeScript.compile(sourceCode, {
    filename: filePath,
    sourceFiles: [filePath],
    inlineMap: false
  })

  // Strip sourceURL from output so there wouldn't be duplicate entries
  // in devtools.
  return output.replace(/\/\/# sourceURL=[^'"\n]+\s*$/, '')
}
