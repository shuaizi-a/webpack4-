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