module.exports = {
  devServer: {
    proxy: {
      "/bs": {
        target: "http://zeus.gel.usherbrooke.ca:8080/intramurus-api/",
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
