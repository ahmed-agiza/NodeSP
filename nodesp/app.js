var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');

var routes = require('./routes/index');
var shortid = require('shortid');
var fs = require('fs')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(multer({
  dest: './uploads/',
  limits: {
    fileSize: 4000000
  },
  onFileUploadStart: function(file, req, res) {
    return console.log(file.fieldname + " is starting..");
  },
  onFileUploadComplete: function(file, req, res) {
    return console.log(file.fieldname + " uploaded to " + file.path);
  },
  onError: function(err, next) {
    console.error(err);
    return next(error);
  },
  onFileSizeLimit: function(file) {
    console.log("Failed: " + file.originalname);
    return fs.unlink("./" + file.path);
  },
  rename: function(fieldname, filename) {
    return shortid.generate() + "_" + Date.now();
  }
}));

var trashEntries = fs.readdirSync('./uploads');
for(var i = 0; i < trashEntries.length; i++){
    fs.unlink('./uploads/' + trashEntries[i]);
}

trashEntries = fs.readdirSync('./temp');
for(var i = 0; i < trashEntries.length; i++){
    fs.unlink('./temp/' + trashEntries[i]);
}

app.use('/', routes);

app.use('/uploads', express["static"](path.join(__dirname, 'uploads')));
app.use('/temp', express["static"](path.join(__dirname, 'temp')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
