import { createServer } from 'node:http';
import { existsSync, statSync, createReadStream } from 'node:fs';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.cwd(), 'dist/deploy');
const port = 5000;

const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.mjs': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.webmanifest': 'application/manifest+json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.avif': 'image/avif',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.pdf': 'application/pdf',
    '.xml': 'application/xml',
    '.txt': 'text/plain; charset=utf-8'
};

if (!existsSync(root)) {
    console.error('Deployment directory not found. Run pnpm build:production first.');
    process.exit(1);
}

const server = createServer((req, res) => {
    let pathname;

    try {
        pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    } catch {
        res.writeHead(400);
        res.end('Bad Request');
        return;
    }

    if (pathname === '/') {
        res.writeHead(302, { Location: '/angular/' });
        res.end();
        return;
    }

    if (pathname === '/angular' || pathname === '/react') {
        res.writeHead(301, { Location: `${pathname}/` });
        res.end();
        return;
    }

    let relativePath = pathname.replace(/^\/+/, '');

    if (pathname.startsWith('/angular/')) {
        relativePath = pathname.slice('/angular/'.length);
        relativePath = `angular/${relativePath}`;
    } else if (pathname.startsWith('/react/')) {
        relativePath = pathname.slice('/react/'.length);
        relativePath = `react/${relativePath}`;
    }

    let filePath = resolve(root, relativePath);

    if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = resolve(filePath, 'index.html');
    }

    if (!existsSync(filePath) || !statSync(filePath).isFile()) {
        if (pathname.startsWith('/angular/')) {
            filePath = resolve(root, 'angular/index.html');
        } else if (pathname.startsWith('/react/')) {
            filePath = resolve(root, 'react/index.html');
        } else {
            res.writeHead(404);
            res.end('Not Found');
            return;
        }
    }

    const contentType = mimeTypes[extname(filePath).toLowerCase()] || 'application/octet-stream';

    res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
    });

    if (req.method === 'HEAD') {
        res.end();
        return;
    }

    createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
    console.log(`Local production preview is running: http://localhost:${port}`);
    console.log(`Angular: http://localhost:${port}/angular/`);
    console.log(`React:   http://localhost:${port}/react/`);
});