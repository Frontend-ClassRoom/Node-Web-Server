

const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

/**
 * createServer 함수로 웹 서버 객체 생성
 * 이 서버로 오는 HTTP 요청마다 createServer에 전달 된 함수가 한 번씩 호출 됨.
 * 요청을 실제로 처리하려면 createServer가 반환 한 server객체의 listen함수가 호출 되어야 함.
 */
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' }); // response header 설정
    res.end('Hello World'); // response body 설정
}).listen(port, hostname, () => {
    // 127.0.0.1:1337 으로 listening
    console.log('Server running at http://${hostname}:${port}');
});