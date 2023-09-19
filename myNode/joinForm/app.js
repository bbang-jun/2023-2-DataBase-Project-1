var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var join = require('./routes/joinForm'); // app.js에 소스를 추가하여 joinForm.js 파일 연결
var board = require('./routes/board'); // 54p

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets'))); // 404 error 방지
app.use('/javascripts', express.static(path.join(__dirname, 'public/javascripts'))); // 404 에러 방지


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/join', join); // app.js에 소스를 추가하여 joinForm.js 파일 연결
app.use('/board', board); // 54p

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
