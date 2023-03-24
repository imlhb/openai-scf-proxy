const express = require("express");
const app = express();
// const product = require("./api/product");
const {
    createProxyMiddleware
} = require('http-proxy-middleware');

// app.use(express.json({ extended: false }));

// app.use("/api/product", product);

app.use('/', createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    // buffer: false,
    autoRewrite: true,
    // headers: { Connection: 'keep-alive' },
    onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        // proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        // proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization';
        // proxyRes.pipe(res);
    }
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
