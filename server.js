var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();

let options = {
    target:  'http://mock-api.voodoo.io', //api.example.com 
    changeOrigin: true,
    logLevel: 'debug',
    onError: function onError(err, req, res) {
        console.log('Something went wrong with the proxy middleware.', err)
        res.end();
    }
};

app.use('/', proxy(options));
app.listen(5000);