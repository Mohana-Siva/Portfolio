import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '..', 'dist');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';

const mimeByExt = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.mp4': 'video/mp4',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, { 'Content-Length': Buffer.byteLength(body), ...headers });
  res.end(body);
}

function safePathFromUrl(urlPathname) {
  const decoded = decodeURIComponent(urlPathname);
  const cleaned = decoded.split('?')[0].split('#')[0];
  const withoutLeadingSlash = cleaned.replace(/^\/+/, '');
  const normalized = path.normalize(withoutLeadingSlash);
  if (normalized.startsWith('..') || path.isAbsolute(normalized)) return null;
  return normalized;
}

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url) return send(res, 400, 'Bad Request', { 'Content-Type': 'text/plain; charset=utf-8' });

    const url = new URL(req.url, `http://${req.headers.host || `${host}:${port}`}`);
    const relative = safePathFromUrl(url.pathname);
    if (relative === null) return send(res, 400, 'Bad Request', { 'Content-Type': 'text/plain; charset=utf-8' });

    const isDir = url.pathname.endsWith('/');
    const requested = isDir ? path.join(relative, 'index.html') : relative || 'index.html';

    let filePath = path.join(distDir, requested);
    let data;

    try {
      data = await readFile(filePath);
    } catch {
      // SPA fallback
      filePath = path.join(distDir, 'index.html');
      data = await readFile(filePath);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeByExt[ext] || 'application/octet-stream';
    send(res, 200, data, { 'Content-Type': contentType });
  } catch (error) {
    send(res, 500, `Server error: ${error?.message || String(error)}`, {
      'Content-Type': 'text/plain; charset=utf-8',
    });
  }
});

server.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`Serving ${distDir} at http://${host}:${port}`);
});

