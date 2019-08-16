module.exports = {
    css: {
      loaderOptions: {
        less: {
          javascriptEnabled: true
        }
      }
    },
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        }
    }
}
