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


## 配置多入口打包编译 (不把第三方类库打包到一起) 
```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// 配置多页面模板
const htmlPlugins = ['index','login'].map(item =>{
  return new HtmlWebpackPlugin({
      //模板页面的路径
      template: `./public/${item}.html`,
      //指定生成的页面的名称 (相当于把模板页面的内容复制过来)
      filename: `${item}.html`,
      // 防止不同的页面生成其他页面的js
      chunks: [item,'jquery'], // 1.谁在前面先加载谁
      hash: true,
    })
})

module.exports = {
  mode: "development",
  // 入口
  // entry: "./src/index.js",
  // 多入口
  entry: {
    index: './src/index.js',
    login: './src/login.js',
    // 2.独立打包第三方类库
    jquery:'jquery'
  },
  // 出口
  output: {
    // 输出的名字
    filename: "[name].js",
    // 输出目录 (目录必须是绝对路径) __dirname（当前路径）
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    // 端口
    port: 3000,
    // 开启GZIP压缩
    compress: true,
    // 显示编译进度
    progress: true,
    // 指定访问资源目录
    contentBase: path.resolve(__dirname, "dist"),
    // 自动打开浏览器
    open: true,
    // 开启热更新
    hot: true,
    proxy:{
      "/":{
        target: "http://192.168.1.102:8888",
        secure: false, // true表示https false表示http
        changeOrigin: true // 把请求头当中的host值修改为服务器地址
      }
    }
  },
  plugins: [
    //创建一个内存
    ...htmlPlugins,
    // 配置清除dist文件夹
    new CleanWebpackPlugin(),
  ],
};
```

## css处理 / less/sass / 字体图标 / html解析img标签url地址 / 图片
> css-loader style-loader
```javascript
npm install css-loader style-loader -D // 处理css
npm install css-loader style-loader less-loader -D // 处理less
npm install css-loader style-loader sass-loader -D // 处理sass
npm install file-loader url-loader -D // 处理图片和字体图标路径问题
npm install html-loader -D // 处理html文件内的img标签src路径

```
```javascript
module.exports = {
  // 插件：加载顺序从右往左，从下往上
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      //配置处理 .less 文件的规则
      {
        test: /\.less$/, 
        use:['style-loader','css-loader','less-loader'] 
      }, 
      //配置处理 .sass 文件的规则
      {
        test: /\.scss$/, 
        use:['style-loader','css-loader','sass-loader'] 
      }, 
      // 处理图片
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: ['url-loader?limit=1063109&name=[hash:8]-[name].[ext]']
      },
      // 配置字体图标
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: ['fild-loader']
      },
      // 配置html可以解析img标签里面src的图片地址
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  }
}
```

## 设置css兼容浏览器
> npm install postcss-loader -D
```javascript
module.exports = {
  // 加载器：加载顺序从右往左，从下往上
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'] //注意顺序
      }
    ]
  }
}
```
>根目录下创建 postcss.config.js文件
```javascript
module.exports = {
  plugins: [
       require('autoprefixer')
    ]
}
```

```javascript
// package.json页面 
"browserslist":[
  ">0.1%", // 兼容99.99%的浏览器
  "last 2 versions"
]
```

## mini-css-extract-plugin(css分离插件)
```javascript
npm install -D mini-css-extract-plugin

// 使用
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  // 插件
  plugins: [

    // 重点
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: "[name].[hash].css",
    }),
  ],
  // 加载器
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          // 重点代替style-loader
          MiniCssExtractPlugin.loader,
          // "style-loader",
          "css-loader",
        ],
      },
    ],
  },
};
```

## 压缩js/css
> npm install optimize-css-assets-webpack-plugin terser-webpack-plugin uglifyjs-webpack-plugin -D
```javascript
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  // 设置优化项
  optimization: {
    // 设置压缩方式
    minimizer: [
      // 压缩css(必须指定js的压缩方式)
      new OptimizeCssAssetsWebpackPlugin(),
      // 压缩js
      // new uglifyjsWebpackPlugin({
      //   cache: true, // 是否使用缓存
      //   parsllel: true, // 是否是并发编译
      //   sourceMap: true // 启动源码映射(方便调试)
      // }),

      new TerserPlugin()
    ]
  }
}
```

## js处理
>npm install babel-loader @babel/core @babel/preset-env -D

>npm install @babel/runtime @babel/polyfill 安装在生产依赖

>npm install @babel/plugin-transform-runtime -D
```javascript
module.exports = {
  // 加载器
  module: {
    rules: [
      {
        test:'/\.js$/',
        use:[{
          loader: 'babel-loader',
          options: {
            // 转换语法阶段
            presets:[
              "@babel/preset-env"
            ],
            // 基于插件处理ES6/ES7中的CLASS语法
            plugins: [
              ["@babel/plugin-proposal-decorators",{
                "legacy":true
              }],
              ["@babel/plugin-proposal-class-properties",{
                "loose": true
              }],
              "@babel/plugin-transform-runtime"
            ]
          }
        }],
        //  设置编译时忽略的目录
        inclide: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]  
  }
};
```

>@babel/polyfill 和其他的webpack插件是不一样的
```javascript

```
       