module.exports = {
  devServer: {
    proxy: {
      "/bs": {
        target: "http://localhost:8080/", //http://intramurus-api.us-east-1.elasticbeanstalk.com
        //ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/bs": ""
        }
      }
    },
    port: 8081
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV !== "production") {
      config.module
        .rule("istanbul")
        .test(/\.(js|vue)$/)
        .enforce("post")
        .include.add("apollo-server")
        .add("src")
        .end()
        .use("istanbul-instrumenter-loader")
        .loader("istanbul-instrumenter-loader")
        .options({ esModules: true })
        .end();
    }
  }
};
