'use strict'

var _ = require('underscore-plus')
var path = require('path')

var defaultOptions = {
  target: 1,
  module: 'commonjs',
  sourceMap: false
}

var TypeScriptSimple = null
var typescriptVersionDir = null

exports.shouldCompile = function () {
  return true
}

exports.compile = function (sourceCode, filePath) {
  if (!TypeScriptSimple) {
    TypeScriptSimple = require('typescript-simple').TypeScriptSimple
  }

  if (process.platform === 'win32') {
    filePath = 'file:///' + path.resolve(filePath).replace(/\\/g, '/')
  }

  var options = _.defaults({filename: filePath}, defaultOptions)
  return new TypeScriptSimple(options, false).compile(sourceCode, filePath)
}
