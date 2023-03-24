const express = require('express')
const {
  createProxyMiddleware
} = require('http-proxy-middleware');
const app = express()
const port = process.env.PORT || 8080;

console.log(port)
app.use('/test', createProxyMiddleware({
  target: 'https://api.openai.com',
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    // 使用流式传输
    proxyRes.pipe(res);
  }
}));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
