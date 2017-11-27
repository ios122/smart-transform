# smart-transform

以单文件方式,智能自动批量将 babeljs,coffeescript,typescript 转换为 es5 兼容的 javascript,可选支持混淆与压缩.

## 使用说明

### 安装

```sh
npm i smart-transform -g
```

### 使用示例

```sh
smart-transform --project="./"
```

### 项目根目录需要有一个 smart-transform.json 文件来配置转换细节

```json
{
  "in":"./src",
  "out":"./lib",
  "exclude":["./src/hi-ignore.js"],
  "minify":true,
  "minifyExclude":["./src/hi-ts.ts"]
}
```

* in 表示输入目录.
* out 表示输出存放目录.
* exclude 表示忽略的文件;被忽略的文件,会原样复制到输出目录.
* minify,是否压缩,默认 false,不压缩.
* minifyExclude,不需要压缩混淆的文件.

### 注意

使用 bable 的js文件,开头应是以下几种的其中一种,否则无法被识别:

```
/** @babel */
"use babel"
'use babel'
/* @flow */
```
