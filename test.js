const http = require('http');

const data = JSON.stringify({ friendIds: [1] });

const options = {
  hostname: 'start.awacode.top',
  port: 21308,
  path: '/api/forum/post/search',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
