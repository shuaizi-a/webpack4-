// 配置项需要基于CommonJs规范
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

// 配置多页面模板
const htmlPlugins = ['index', 'src/login/login', 'src/user/user'].map(item => {
  return new HtmlWebpackPlugin({
    //模板页面的路径
    template: `./public/${item}.html`,
    //指定生成的页面的名称 (相当于把模板页面的内容复制过来)
    filename: `${item}.html`,
    // 防止不同的页面生成其他页面的js
    chunks: [item, 'jquery'], // 1.谁在前面先加载谁
    hash: true,
  })
})

module.exports = {
  // 设置编译模式 production生产模式（会压缩代码）  development开发模式
  mode: 'production',
  // 入口
  entry: {
    index: './public/index.js',
    'src/login/login': './public/src/login/login.js',
    'src/user/user': './public/src/user/user.js'
  },
  // 出口
  output: {
    // 输出的名字
    filename: '[name][hash].js', // [hash] 随机生成一个值，保证每一次编译出来的文件名不一样
    // 输出目录 (目录必须是绝对路径) __dirname（当前路径）
    path: path.resolve(__dirname, 'dist')
  },
  // 热启动
  devServer: {
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
    // proxy: {
    //   "/": {
    //     target: "http://localhost:8888",
    //     secure: false, // true表示https false表示http
    //     changeOrigin: true // 把请求头当中的host值修改为服务器地址
    //   }
    // }
  },
  // 插件
  plugins: [
    ...htmlPlugins,
    // 删除dist旧内容
    new CleanWebpackPlugin(),//清理构建文件夹
    new MiniCssExtractPlugin({
      // 类似 webpackOptions.output里面的配置 可以忽略
      filename: "[name].css",
      chunkFilename: "[id].css",
    })
  ],// 加载器：加载顺序从右往左，从下往上
  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      // 处理图片
      {
        test: /\.(jpg|png|gif|bmp|jpeg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1024,//限制打包图片的大小：
            //如果大于或等于8192Byte，则按照相应的文件名和路径打包图片；如果小于8192Byte，则将图片转成base64格式的字符串。
            name: 'imges/[name].[hash].[ext]',//img:图片打包的文件夹；
            //[name].[ext]：设定图片按照本来的文件名和扩展名打包，不用进行额外编码
            //[hash:8]：一个项目中如果两个文件夹中的图片重名，打包图片就会被覆盖，加上hash值的前八位作为图片名，可以避免重名。
            publicPath: './'
          }
        }]
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
  },
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
};