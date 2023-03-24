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
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        // 使用流式传输
        proxyRes.pipe(res);
    }
}));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));