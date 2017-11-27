'use strict'

var path = require('path')
var defaultOptions = require('./babelrc.json')

var babel = null
var babelVersionDirectory = null

var PREFIXES = [
  '/** @babel */',
  '"use babel"',
  '\'use babel\'',
  '/* @flow */'
]

var PREFIX_LENGTH = Math.max.apply(Math, PREFIXES.map(function (prefix) {
  return prefix.length
}))

exports.shouldCompile = function (sourceCode) {
  var start = sourceCode.substr(0, PREFIX_LENGTH)
  return PREFIXES.some(function (prefix) {
    return start.indexOf(prefix) === 0
  })
}

exports.compile = function (sourceCode, filePath) {
  if (!babel) {
    babel = require('babel-core')
    var Logger = require('babel-core/lib/transformation/file/logger')
    var noop = function () {}
    Logger.prototype.debug = noop
    Logger.prototype.verbose = noop
  }

  if (process.platform === 'win32') {
    filePath = 'file:///' + path.resolve(filePath).replace(/\\/g, '/')
  }

  var options = {filename: filePath}
  for (var key in defaultOptions) {
    options[key] = defaultOptions[key]
  }
  return babel.transform(sourceCode, options).code
}
