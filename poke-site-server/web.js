//기본 App 설정
const express=require('express');
const app=express();
const bodyParser=require('body-parser');
process.env.NODE_ENV = ( process.env.NODE_ENV && ( process.env.NODE_ENV ).trim().toLowerCase() == 'production' ) ? 'production' : 'development';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

const path=require('path');
app.use(express.static('public'));
app.use(express.static(path.join(__dirname,'client/build')));

//서버 측 util 설정
const favicon=require('serve-favicon');

const faviconPath=path.join(__dirname,'public','images','favicon.ico');
app.use(favicon(faviconPath));

//dev옵션 설정
const config=require('./config');
const morgan = require('morgan');
app.use(morgan('tiny'));

//Router 설정
const user=require('./user/index');
const api=require('./api/index');

//Routing
app.use('/api',api);
app.use('/user',user);

//Source Code Start
app.listen(config.server.port,()=>{
    console.log(`Server is running on ${config.server.port}`);
})

app.get('/',(req,res)=>{
    res.sendFile('/index.html');
})

module.exports=app;
