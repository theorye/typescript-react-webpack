import * as express from "express";
import * as path from "path";

const server = express();

const isProd = process.env.NODE_ENV === "production";

if(!isProd) {
    const webpack = require('webpack');
    const config = require("../../config/webpack.dev.js");
    const compiler = webpack(config);

    const webpackDevMiddleware = require("webpack-dev-middleware")(
        compiler,
        config.devServer
    );

    const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);


    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddleware);

    console.log("Middleware is enabled");
}

const expressStaticGzip = require("express-static-gzip")
server.use(
  expressStaticGzip("dist", {
    enableBrotli: true
  })
)

const PORT = process.env.PORT || 8001
server.listen(PORT, () => {
  console.log(
    `Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`
  )
})
