var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")
var cors = require("cors")

var indexRouter = require('./routes/index');
var sensitiveRouter = require("./routes/sensitive")

var app = express();

//DB setup
mongoose.connect("mongodb://0.0.0.0:27017/tinder_clone")

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"))
db.once('open', () => {
    console.log('Connected to the database');
});

app.use(logger('dev'));
app.use(cors(["*"]));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter); //Routes that are ok to expose online
app.use('/sensitive', sensitiveRouter) //Routes that could be exposed only to users

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


module.exports = app;
