## 初始化项目
```cmd
<!-- 在项目根目录下执行命令，初始化项目(目录不能出现中文，大写字母，特殊字符) -->
npm init -y
```

## 安装webpack4
```cmd
npm i webpack@4 webpack-cli --save-dev 
// 部署在开发项目下
```

## 生产依赖：服务器部署环境
```cmd
npm install package-name --save
或
npm install package-name -S
```

## 开发依赖：本地开发环境 --save-dev
```cmd
npm install package-name --save-dev
或
npm install package-name -D
```

## 零配置打包
> webpack默认会把当前项目src目录下的文件(index.js)进行打包编译，编译到dist文件目录下
+ /src
  >当前项目开发的源代码
+ /dist
  - 编译后的文件（未来部署到服务器上的）
```cdm
npx webpack
```

## 配置打包命令
```javascript
// package.json文件下
  "scripts": {
    "biud": "webpack"
  },
```

## 自己配置webpack渲染js
+ 1.在根目录下创建webpack.config.js
  ```javascript
  // 配置项需要基于CommonJs规范
  const path = require('path');

  module.exports = {
    // 设置编译模式 production生产模式（会压缩代码）  development开发模式
    mode: 'production',
    // 入口
    entry: './src/index.js', 
    // 出口
    output: {
      // 输出的名字
      filename: 'bundle[hash].js', // [hash] 随机生成一个值，保证每一次编译出来的文件名不一样
      // 输出目录 (目录必须是绝对路径) __dirname（当前路径）
      path: path.resolve(__dirname, 'dist')
    }
  };
  ```

  ## 配置开发和生产不同的版本
  ```javascript
  // webpack.config.pro.js //生产环境代码
  // webpack.config.dev.js //开发环境代码
  // webpack.config.js //两个板块都需要的东西环境代码

  // 配置打包命令
  "scripts": {
    "biud": "webpack", //两个板块都需要的东西环境代码
    "dev": "webpack --config webpack.config.dev.js", // 开发环境
    "pro": "webpack --config webpack.config.pro.js"  // 生产环境
  },
  ```

## html 配置
>html-webpack-plugin插件
+ 安装
  ```javascript
  npm i html-webpack-plugin -D
  ```
+ 配置
  ```javascript
  const htmlwebpackplugin = require('html-webpack-plugin') 

  module.exports = {
    // 插件
    plugins:[
      //创建一个内存
      new htmlwebpackplugin ({ 
        //模板页面的路径
        template:'./public/index.html', 
        // 生成后的文件名称
        filename:'index.html',
        // 哈希值
        hash: true, // js编译那就不用写了
        minify：{

        }
      })
    ]
  }

  // 模板内不用写编译后的文件路径，插件会自动导入里面
  ```
  [minify配置](html-minifier中文文档)


## webpack-dev-server / 热编译并起服务
```javascript
module.exports = {
 devServer:{
    // 端口
    port: 3000,
    // 开启GZIP压缩
    compress: true,
    // 显示编译进度
    progress: true,
    // 指定访问资源目录
    contentBase: path.resolve(__dirname, "dise"),
    // 自动打开浏览器
    open: true,
    // 开启热更新
    hot: true,
    // 请求代理
    proxy:{
      "/":{
        target: "http://localhost:8888",
        secure: false, // true表示https false表示http
        changeOrigin: true // 把请求头当中的host值修改为服务器地址
      }
    }
 }
}
```
[配置webpack-dev-server](https://blog.csdn.net/weixin_43684713/article/details/92839419)
[webpack编译遇到的问题：Error: Cannot find module 'webpack-cli/bin/config-yargs'](https://www.cnblogs.com/jeacy/p/13864454.html)
```javascript
卸载当前的 webpack-cli npm uninstall webpack-cli

安装 webpack-cli 3.* 版本 npm install webpack-cli@3 -D
```

## clean-webpack-plugin / 每次打包一次清除之前打包的内容
```javascript
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

  module.exports = {
    // 插件
    plugins:[
      // 配置清除dist文件夹
      new CleanWebpackPlugin()
    ]
  }
```
