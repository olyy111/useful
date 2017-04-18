module.exports = {
  entry:  __dirname + "/src/index.js",
  output: {
    path: __dirname + "/dist",
    filename: "zscroll.js",
    library: "ZScroll",
    libraryTarget: "umd"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        
      }
    ]
  }
}