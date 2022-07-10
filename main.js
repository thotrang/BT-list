const http = require('http');
const fs = require('fs');
const qs = require('qs');

const server = http.createServer((req, res) => {
    if (req.method == 'GET') {
        fs.readFile('index.html', (err, data) => {
            res.writeHead(200, { 'content-type': 'text/html' });
            res.write(data);
            return res.end();
        })
    } else {
        let data = '';
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(data);
            fs.readFile('display.html', 'utf8', (err, datahtml) => {
                if (err) {
                    console.log(err);
                } else {
                    datahtml=datahtml.replace('{text}', userInfo.text);
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(datahtml);
                    return res.end();
                }
            })
        })
        req.on('err', () => {
            console.log('err');
        })
    }
});
server.listen(8080, () => {
    console.log('this is hostlocal 8080');
})