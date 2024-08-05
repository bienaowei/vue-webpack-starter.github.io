// 这个 js 是什么模块化规范
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { VueLoaderPlugin } = require('vue-loader')

//参考网站
//https://developer.aliyun.com/article/891807
module.exports = {
  // 指定入口
  // 我们其实可以指定多个入口
  entry: {
    index: "./src/main.js",
    // 1. 提取公共依赖
    // 2. 开发多页面应用  SPA、MPA
    // deps: "./src/deps.js",
  },
  // 模块编译转化
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            // plugins: ["@babel/plugin-transform-arrow-functions"],
          },
          //排除/node_modules/文件
          //还有include,指定文件查找
          //exclude: /node_modules/,
        },
        // use: "swc-loader",
      },
      {
          test:/\.vue/,
          loader:'vue-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        //style-loader跟mini-css-extract-plugin区别
        //style注入标签里导致一个文件过大
        //mini-css-extract-plugin将样式代码抽离成单独的 CSS 文件。
      },
      {
        test:/\.jc/,
        loader:"./loaders/jc-loader.js"
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader', //能够将图片转成base64代码直接写在js里面,依赖file-loader，所以在安装的时候不仅要装url-loader还要装file-loader
            options: {
              limit: 1024, //如果文件大小小于1024字节，就会转义成base64,否则仍然是图片
              name: '[name]-text.[ext]' //输出文件的名字,name就是原先图片的名字,-text是自己家的字段
              
              // outputPath: 'images', // 决定文件本地输出路径
              // publicPath: './images',  // 决定图片的url路径
            }
          }
        ]
      },
      {
        test: /\.(eot|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
        loader: 'file-loader',
        options: {
          outputPath: 'media',
          name: '[hash:8].[ext]'
        }
      }
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title:"VUE WebPack Starter",
    template:"./index.html"
  }), new MiniCssExtractPlugin(),new VueLoaderPlugin()],
  // 指定输出
  output: {
    clean: true,
  },
  // 目标环境
  // target: ["web", "es5"],
  // target: "browserslist",
  // compress: true, // 启动gzip压缩
  //导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在
  //Webpack 优先使用目录下的 TypeScript 文件，可以这样配置： 
  resolve: {
    extensions: [".js",".vue"],
  },
  //指定devServer
  devServer:{
    //端口
    port:3000,
    //可以通过localhost,127.0.0.1,本机的内网IP进行访问（IP的话，就可以在别人的电脑上访问）
    // host: "192.168.31.250", 
    //是否直接打开
    open:true,
    //热更新
    hot:true,
    client: {
      progress: true,
    },
  }
};
