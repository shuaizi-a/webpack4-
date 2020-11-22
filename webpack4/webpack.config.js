const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  // 入口
  entry: "./src/index.js",
  // 出口
  output: {
    // 输出的名字
    filename: "dev.js",
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
    hot: true
  },
  plugins: [
    //创建一个内存
    new HtmlWebpackPlugin({
      //模板页面的路径
      template: "./public/index.html",
      //指定生成的页面的名称 (相当于把模板页面的内容复制过来)
      filename: "index.html",
      hash: true,
    }),
    // 配置清除dist文件夹
    new CleanWebpackPlugin(),
  ],
};
