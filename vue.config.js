module.exports = {
  devServer: {
    proxy: {
      "/bs": {
        target: "http://localhost:8080", //http://intramurus-api.us-east-1.elasticbeanstalk.com
        //ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/bs": ""
        }
      }
    },
    port: 8081
  }
};
