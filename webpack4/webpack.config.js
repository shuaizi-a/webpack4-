const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const urlList = require("./config");
const htmlPlugins = [];
const templateList = {};
for (let [key, val] of Object.entries(urlList)) {
  htmlPlugins.push(
    new HtmlWebpackPlugin({
      //模板页面的路径
      template: `./public/${key}.html`,
      //指定生成的页面的名称 (相当于把模板页面的内容复制过来)
      filename: `${key}.html`,
      // 防止不同的页面生成其他页面的js
      chunks: [key],
      hash: true,
    })
  );
  
  if (templateList[key]) {
    templateList[key] = val;
  }
}

// 配置多页面模板
// const htmlPlugins = ["index", "login/index"].map((item) => {
//   return new HtmlWebpackPlugin({
//     //模板页面的路径
//     template: `./public/${item}.html`,
//     //指定生成的页面的名称 (相当于把模板页面的内容复制过来)
//     filename: `${item}.html`,
//     // 防止不同的页面生成其他页面的js
//     chunks: [item],
//     hash: true,
//   });
// });

module.exports = {
  mode: "development",
  // 入口
  // entry: "./src/index.js",
  // 多入口
  // entry: {
  //   index: "./src/index.js",
  //   "login/index": "./src/login/index.js",
  // },
  entry: templateList,
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
    proxy: {
      "/": {
        target: "http://192.168.1.102:8888",
        secure: false, // true表示https false表示http
        changeOrigin: true, // 把请求头当中的host值修改为服务器地址
      },
    },
  },
  plugins: [
    //创建一个内存
    ...htmlPlugins,
    // 配置清除dist文件夹
    new CleanWebpackPlugin(),
  ],
};
