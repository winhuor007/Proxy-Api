"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const app = (0, express_1.default)();
// Proxy for the Product service
app.use('/product', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:4001',
    changeOrigin: true,
    pathRewrite: {
        '^/product': '/',
    },
}));
// Proxy for the Auth service
app.use('/auth', (0, http_proxy_middleware_1.createProxyMiddleware)({
    target: 'http://localhost:4002',
    changeOrigin: true,
    pathRewrite: {
        '^/auth': '/',
    },
}));
app.listen(4000, () => {
    console.log('API Proxy is running on http://localhost:4000');
});
