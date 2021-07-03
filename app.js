const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

var app = express();

app.use(morgan('combined')); // 요청에 대한 정보를 표시해 줌

sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.log(err);
    });

// 라우터들의 맨 마지막에 실행 (404 처리)
app.use((req, res, next) => {
    res.send("404 에러!");
});

// error 미들웨어
// 반드시 err, req, res, next 4개의 매개변수가 있어야 함
app.use((err, req, res, next) => {
    console.log(err);
    res.send("서버 에러 발생.");
});

app.listen(process.env.PORT, function () {
    console.log('Connected 3000 port!');
});



