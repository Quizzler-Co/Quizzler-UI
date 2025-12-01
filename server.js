// server.js
// Express proxy server for serving frontend and proxying API requests to backend

import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const FRONTEND_DIR = path.join(__dirname, 'dist'); // Vite build output directory

// Serve static frontend files
app.use(express.static(FRONTEND_DIR));

// Proxy /api to backend running on localhost:8086 (API Gateway)
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8086',  // Your API Gateway
  changeOrigin: true,
  ws: true,  // WebSocket support
  logLevel: 'debug',  // More verbose logging for debugging
  pathRewrite: { '^/api': '/api' },  // Keep same path
  onProxyReq: (proxyReq, req, res) => {
    console.log(`[PROXY] ${req.method} ${req.url} -> http://localhost:8086${req.url}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    console.log(`[PROXY] Response: ${proxyRes.statusCode} ${proxyRes.statusMessage} for ${req.method} ${req.url}`);
    
    // Log error responses for debugging
    if (proxyRes.statusCode >= 400) {
      // Capture error response body
      let body = '';
      proxyRes.on('data', (chunk) => {
        body += chunk.toString();
      });
      proxyRes.on('end', () => {
        console.error(`[PROXY] Error response body:`, body.substring(0, 500));
      });
    }
  },
  onError: (err, req, res) => {
    console.error(`[PROXY ERROR] ${req.method} ${req.url}:`, err.message);
    res.status(500).json({ 
      error: 'Proxy error', 
      message: err.message,
      details: 'Failed to connect to API Gateway at http://localhost:8086'
    });
  }
}));

// Fallback for SPA routing - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, 'index.html'));
});

const PORT = process.env.PORT || 4173;

app.listen(PORT, () => {
  console.log(`\n✅ Proxy server running on http://localhost:${PORT}`);
  console.log(`📁 Serving frontend from: ${FRONTEND_DIR}`);
  console.log(`🔄 Proxying /api/* to: http://localhost:8086`);
  console.log(`\n🌐 Expose with Cloudflare Tunnel:`);
  console.log(`   cloudflared tunnel --url http://localhost:${PORT}\n`);
});

