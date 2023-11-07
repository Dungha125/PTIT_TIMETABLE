const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Cấu hình máy chủ proxy để chuyển tiếp yêu cầu đến máy chủ nguồn
const proxy = createProxyMiddleware('/api/auth/login', {
  target: 'https://qldt.ptit.edu.vn', // URL của máy chủ nguồn
  changeOrigin: true,
  pathRewrite: {
    '^/api/auth/login': '/api/auth/login', // Điều này sẽ đảm bảo rằng các yêu cầu POST sẽ được chuyển tiếp đúng đường dẫn.
  },
});

app.use('/api/auth/login', proxy);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});