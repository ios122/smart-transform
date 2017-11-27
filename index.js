#!/usr/bin/env node
'use strict'
var path = require("path")
var fs = require ('fs-plus')
var fse = require('fs-extra')
var os = require("os")
var {execSync} = require("child_process")
var UglifyJS = require("uglify-js")

var argv = require('minimist')(process.argv.slice(2))

var project = argv.project
var configInfo = require(path.resolve(project,"./smart-transform.json"))

var inDir = path.resolve(project,configInfo.in)
var outDir = path.resolve(project,configInfo.out)
var minify = configInfo.minify

var excludeFiles = configInfo.exclude.map(function (filePath) {
  return path.resolve(project,filePath)
})

var minifyExcludeFiles = configInfo.minifyExclude.map(
  function (filePath) {
    return path.resolve(project,filePath)
  }
)

fse.ensureDirSync(outDir)

var inFiles = fs.listSync(inDir,[".js",".ts","coffee"])

for (var inFile of inFiles) {
    if (excludeFiles.includes(inFile)) { // 不需要处理的,直接复制到输出目录
      var outFile = path.resolve(project,outDir,path.basename(inFile))
      fse.copySync(inFile,outFile)
      continue
    }

    var sourceCode = require("./compile-file")(inFile)

    if (minify && !minifyExcludeFiles.includes(inFile)) {
      sourceCode = UglifyJS.minify(sourceCode).code
    }

    var outFile = path.resolve(project,outDir,path.basename(inFile,path.extname(inFile)) + ".js")
    fse.ensureFileSync(outFile)
    fs.writeFileSync(outFile,sourceCode)
}
