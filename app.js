const express = require('express');
const app = express();
const config = require('./config/db');      //连接mongodb数据库
const api = require('./src/api');           //处理前端发起的请求
const mongoose = require('mongoose');       //使用mongoose可以进行数据库的CRUD操作
const bodyParser = require('body-parser');  //对post请求的请求体进行解析

mongoose.connect(config.mongodb);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));   //body请求体的数据类型可以是任意的
app.use('/api', api);
//前端发起api的请求端口号3000
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})