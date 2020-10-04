var serve = require('koa-static');
var koa = require('koa');
var app = new koa();

app.use(serve('./dist'));

app.listen(8080);