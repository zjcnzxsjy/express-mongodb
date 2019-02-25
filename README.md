---
title: express和mongodb开发后端服务
date: 2018-04-26 20:16:33
tags:
---
目录结构(不定期更新)
```
|——config         
|  |——db.js             //mongodb数据库地址
|  |——startMongodb.bat  //启动数据库脚本
|——src                  //源代码
|  |——models            //数据模型
|  |——utils             //公共方法
|  └──api.js            //注册数据模型
|——.gitignore           //gitignore文件
|——app.js               //启动express服务和连接mongodb
|——package.json         
└──README.md            
```
## Mongodb和Express
为了实现前后端分离，使用了express开发后端(不会java，现在javascript大有一同天下趋势，已经延伸到许多角落便于javascript开发者使用)，数据库使用mongodb。  
[mongodb的搭建可以参考这篇教程](https://segmentfault.com/a/1190000004868504)  
下载必要的npm包，包括express，mongoose等。在项目根目录新建app.js文件用于连接mongodb、启动express服务
```
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
```
在config文件夹下有个db.js文件
```
//本项目的数据库地址
module.exports =  {
    mongodb : "mongodb://localhost:27017/management"
}
```
MongoDB可视化工具使用Robomongo，models目录放数据模型,mongoose的每个数据model需要一个schema生成。由于我们的express是在3000端口启动的,而前端开发是其他端口，例如8080,由于跨域所以要配置好vue-cli的proxy选项,位于vue.config.js,改写proxy
```
devServer: {
    port: 8080,
    proxy: {
      "/api/*": {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true
      }
    }
},
```
这样当在前端用axios访问 '/api' 的时候,就会被代理到 'http://localhost:3000/api',从而获得需要的数据。

