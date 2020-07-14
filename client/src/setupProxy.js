const proxy = require('http-proxy-middleware')
const createProxyMiddleware = proxy.createProxyMiddleware

module.exports = function(app) {
    app.use(createProxyMiddleware("/api", { target: "http://localhost:5000" ,
    changeOrigin: true}));
};