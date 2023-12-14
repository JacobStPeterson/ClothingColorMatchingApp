const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = '.' + req.url;

    if (filePath.startsWith('./users/json/')) {
        // Serve JSON files
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('404 Not Found');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (filePath.startsWith('./users/img/')) {
        // Serve images
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('404 Not Found');
            }

            const extname = path.extname(filePath);
            const contentType = {
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.png': 'image/png',
                // Add more content types as needed
            }[extname] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    } 
    // Serve files from the src folder
    // Serve HTML files
    else if (path.extname(filePath) === '.html') {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    else if (filePath.startsWith('./src/')) {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }

            const extname = path.extname(filePath);
            const contentType = {
                '.js': 'text/javascript',
                '.css': 'text/css',
            }[extname] || 'application/octet-stream';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    } else if (req.url === '/users/json-list') {
        // Access data from the users folder
        fs.readdir('./users/json/', (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                return res.end('Internal Server Error');
            }

            const jsonFiles = files.filter(file => path.extname(file) === '.json');
            const jsonResponse = JSON.stringify({ jsonFiles });

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(jsonResponse);
        });
    } else {
        // Handle other requests (e.g., HTML pages)
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                return res.end('404 Not Found');
            }

            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
