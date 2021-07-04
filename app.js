const dotenv = require('dotenv');
dotenv.config();

// modules load
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

// Routers
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const { sequelize } = require('./models');
const passportConfig = require('./passport');

var app = express();
passportConfig();   // 패스포트 설정 실행

// DB 연결 수행
sequelize.sync({ force: false })
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(morgan('combined')); // 요청에 대한 정보를 표시해 줌
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());    // 로그인 이후 요청부터 passport의 deserializeUser이 실행 됨

app.use('/auth', authRouter);
app.use('/user', userRouter);


// 라우터들의 맨 마지막에 실행 (404 처리)
app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

// error 미들웨어
// 반드시 err, req, res, next 4개의 매개변수가 있어야 함
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
});

app.listen(process.env.PORT, function () {
    console.log('Connected 3000 port!');
});



