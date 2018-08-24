//require('./config/config');

const path=require('path');
const publicPath=path.join(__dirname, '../public');

//const _ = require('lodash');

const express=require('express');
const bodyParser=require('body-parser');

//var {authenticate} = require('./middleware/authenticate');

const app=express();

//const port = process.env.PORT;
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`started on port: ${port}`);
});
