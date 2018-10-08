module.exports = {
  devServer: {
    proxy: {
      "/bs": {
        target: "http://localhost:8080",
        //ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/bs": ""
        }
      }
    }
  }
};
