

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import dotenv from 'dotenv';

// Specify the correct path to your .env.development file
dotenv.config({ path: './src/configs/.env.development' });

const app = express();
const port = process.env.PORT;

const pathFilter = function (path: string, req: express.Request) {
  return path.match('^/api') && req.method === 'GET';
};

// Proxy setup to redirect requests to another server
app.use('/api/v1/products', createProxyMiddleware({
  logger: console,
  target: 'http://localhost:3000/v1/products', 
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/api': '', 
  },
  // Uncomment the following line if you want to use the pathFilter
  // filter: pathFilter,
}));

// Proxy setup to redirect requests to authorized domains
app.use('/auth/signin', createProxyMiddleware({
  logger: console,
  target: 'http://localhost:3000/auth/signin', 
  changeOrigin: true, // needed for virtual hosted sites
  pathRewrite: {
    '^/auth': '',
  },
}));

app.listen(port, () => {
  console.log(`API Proxy is running on http://localhost:${port}`);
  console.log("----------------------------------------------------------------");
});