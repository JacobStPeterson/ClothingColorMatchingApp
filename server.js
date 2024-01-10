const sha512 = require('js-sha512');
const http = require('http');
const fs = require('fs');
const path = require('path');
const busboy = require('busboy');

const port = 3000;

const server = http.createServer((req, res) => {
    const filePath = '.' + req.url;

    if (req.url === '/authenticate' && req.method === 'POST') {
        let requestBody = '';
        req.on('data', chunk => {
            requestBody += chunk.toString();
        });

        req.on('end', () => {
            try {
                const {username, password} = JSON.parse(requestBody);
                const jsonCont = fs.readFileSync('./users/accounts.json');
                const hashtable = JSON.parse(jsonCont);
          
                //console.log(hashtable);
                var hashed_password = sha512(password);

                //console.log("hashed pw: " + hashed_password);
                if ((username in hashtable) && hashed_password === hashtable[username]) {
                    
                    console.log('match established');
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({success: true}));
                }
                else {
                    res.writeHead(401, {'Content-Type': 'application/json'});
                    res.end(JSON.stringify({success: false, message: 'Invalid Credentials'}));
                }
            
            }
            catch (error) {
                console.error('Error parsing request body:', error);
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end('Bad Request');
            }
        })

    }
    else if (req.url === '/initializeAccount' && req.method === 'POST')
    {
        let requestBody = '';
        req.on('data', chunk => {
            requestBody += chunk.toString();
        });

        req.on('end', () => {
            try {
                const {username, password, email} = JSON.parse(requestBody);
                const jsonCont = fs.readFileSync('./users/accounts.json');
                const hashtable = JSON.parse(jsonCont);
          
                // ensure that user name doesnt already exist
                if (username in hashtable) 
                {
                    res.end('User already exists');
                }
                /**
                 * if (email in (where emails are stored)) {res.end('Email already}
                 */

                // hash the password
                var hashed_password = sha512(password);

                // input the username and password hash into accounts.json
                hashtable[username] = hashed_password;
                // save hashtable 
                const jsonStr = JSON.stringify(hashtable);
                fs.writeFileSync('./users/accounts.json', jsonStr);

                // make user directory, img directory and json directory
                fs.mkdir(`./users/${username}/`, (err) => {
                    if (err) return console.error('name');
                });
                fs.mkdir(`./users/${username}/img/`, (err) => {
                    if (err) return console.error('img');
                });
                fs.mkdir(`./users/${username}/json/`, (err) => {
                    if (err) return console.error('json');
                });

                console.log('Account Created');
                res.writeHead(200, {'Content-Type': 'application/json'});
                console.log("head written");
                res.end(JSON.stringify({success: true}));
            }
            catch (error) {
                console.error('Error parsing request body:', error);
                res.writeHead(401, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({success: false, message: 'Bad Credentials'}));
            }
        })
    }
    else if (filePath.startsWith('./users/') && filePath.includes('/json/') && filePath.endsWith('json')) {
        // Serve JSON files
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                return res.end('404 Not Found');
            }

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(data);
        });
    } else if (filePath.startsWith('./users') && filePath.includes('/img/')) {
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
    } else if (filePath.startsWith('./users/') && filePath.includes('/json')) {
        // Access data from the users folder
        fs.readdir(filePath, (err, files) => {
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
    } else if (req.url === '/upload') {
        
        let filename = ''
        const bb = busboy({ headers: req.headers });
        bb.on('file', (name, file, info) => {
            filename = info.filename;
            const saveTo = path.join(__dirname, filename);
            file.pipe(fs.createWriteStream(saveTo));
        });

        bb.on('close', () => {
            res.writeHead(200, {'Content-Type': 'text/plain' });
            res.end(`upload success: ${filename}`);
        });

        req.pipe(bb);

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
