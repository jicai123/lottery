const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';
const timeStamp = new Date().getTime()
// npm install compression-webpack-plugin@6.1.1
module.exports={
  publicPath: process.env.Node_ENV === 'production' ? './' : '',
  filenameHashing: false,
  outputDir: 'dist',
  assetsDir: 'static',
  indexPath: 'main.html',
  parallel: false,
  productionSourceMap: false,
  pluginOptions:{
    'style-resources-loader':{
      preProcessor:'less',
      patterns:[
        path.resolve(__dirname,'./src/assets/css/app.less')
      ]
    }
  },
  devServer: {
    proxy: {

    }
  },
  configureWebpack: config =>{
    const plugins = [];

    config.plugins = [...config.plugins, ...plugins];
    config.output.filename = `js/[name].${timeStamp}.js`
    config.output.chunkFilename = `js/chunk.[id].${timeStamp}.js`
  }
}