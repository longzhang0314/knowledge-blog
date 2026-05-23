import {createReadStream} from 'node:fs';
import {stat} from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..', 'build');
const args = process.argv.slice(2);
const portIndex = args.findIndex((arg) => arg === '--port' || arg === '-p');
const portValue = portIndex >= 0 ? args[portIndex + 1] : args.find((arg) => arg.startsWith('--port='))?.split('=')[1];
const port = Number(process.env.PORT || portValue || 3000);
const host = process.env.HOST || '127.0.0.1';
const baseUrl = process.env.BASE_URL || '/knowledge-blog/';

const types = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml; charset=utf-8'],
  ['.xml', 'application/xml; charset=utf-8'],
]);

function normalizeUrl(url) {
  const parsed = new URL(url, 'http://localhost');
  let pathname = decodeURIComponent(parsed.pathname);
  if (pathname === '/') {
    return {redirect: baseUrl};
  }
  if (baseUrl !== '/' && pathname.startsWith(baseUrl)) {
    pathname = pathname.slice(baseUrl.length - 1);
  }
  return {pathname};
}

async function resolveFile(pathname) {
  const cleanPath = pathname.replace(/^\/+/, '');
  const candidates = [
    cleanPath,
    `${cleanPath}.html`,
    path.join(cleanPath, 'index.html'),
    '404.html',
  ];

  for (const candidate of candidates) {
    const filePath = path.join(root, candidate);
    if (!filePath.startsWith(root)) {
      continue;
    }
    try {
      const fileStat = await stat(filePath);
      if (fileStat.isFile()) {
        return filePath;
      }
    } catch {
      // Try the next candidate.
    }
  }
  return path.join(root, '404.html');
}

const server = http.createServer(async (req, res) => {
  const normalized = normalizeUrl(req.url || '/');
  if (normalized.redirect) {
    res.writeHead(302, {Location: normalized.redirect});
    res.end();
    return;
  }

  const filePath = await resolveFile(normalized.pathname);
  res.writeHead(path.basename(filePath) === '404.html' ? 404 : 200, {
    'Content-Type': types.get(path.extname(filePath)) || 'application/octet-stream',
  });
  createReadStream(filePath).pipe(res);
});

server.listen(port, host, () => {
  console.log(`Preview server running at http://localhost:${port}${baseUrl}`);
});
