# File compression 🗜️

> To start this exercise, be sure to be in `./packages/intermediate/compression` folder.
> Be sure you have [installed this repository first](../README.md#install)

## Why compressing your file outputs ?

Gzip compression is something which is saving 30% of internet transfer volume.
You could let your webserver compress your generated bundle _on the fly_ on each request but for static files you should really try to compress it in your build steps.

All decent web server can serve pre-compressed files if browser asked for it.

Good news, Webpack has a plugin for you. :tada:

## Add Gzip compression

Look at [Webpack compression plugin](https://webpack.js.org/plugins/compression-webpack-plugin) configuration and try to add it.
