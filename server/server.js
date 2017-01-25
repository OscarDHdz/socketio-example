const path = require('path');
const express = require('express');

var app  = express();
var port = 3000;

var publicPath = path.join(__dirname, '../public');
console.log(__dirname + '/../public');
console.log(publicPath);

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});
