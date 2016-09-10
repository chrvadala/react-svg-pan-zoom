var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic(__dirname));
app.listen(3000);
console.log("website listen on port 3000");
