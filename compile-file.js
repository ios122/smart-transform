'use strict'
/* 相关预编译逻辑取自原Atom代码中的 src/compile-cache.js 类,
未来当 Atom 的预编译策略发生变化时,此处涉及到的各个功能类最好也对应适当修改.
区别: 禁用代码地图 + 禁用输出代码内注释
 */

var path = require('path')
var fs = require('fs-plus')

var COMPILERS = {
  '.js': require('./babel'),
  '.ts': require('./typescript'),
  '.coffee': require('./coffee-script')
}

function compileFileAtPath (filePath) {
  const extension = path.extname(filePath)
  const compiler = COMPILERS[extension]

  var sourceCode = fs.readFileSync(filePath, 'utf8')

  if (compiler.shouldCompile(sourceCode, filePath)) {
    const compiledCode = compiler.compile(sourceCode, filePath)
    return compiledCode
  }

  return sourceCode
}

module.exports = compileFileAtPath
