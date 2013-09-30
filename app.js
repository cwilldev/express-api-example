/*******************************************************************************************
 * EXPRESS.JS
 *******************************************************************************************/

var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());


/*******************************************************************************************
 * EXPRESS API
 *******************************************************************************************/

// Express API: Instanciate and configure endpoints
var ExpressApi = require("express-api").getInstance(app, require("./conf/express-api." + app.get('env') + ".json"));

// Express API: Send response
app.use(ExpressApi.process());

// Express API: Error handler (optional)
app.use(ExpressApi.errorHandler());


/*******************************************************************************************
 * OTHER MIDDLEWARES
 *******************************************************************************************/

// Add router implementation
app.use(app.router);


/*******************************************************************************************
 * START SERVER
 *******************************************************************************************/

var http = require('http');
var server = http.createServer(app);
server.listen(app.get('port'));