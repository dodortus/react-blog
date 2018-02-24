const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const api = require('./api');
const mongoose = require('mongoose');
const config = require('../config.json');

const app = new Koa();
const router = new Router();
const databaseServer = {
  url: `mongodb://${config.databaseServer.host}:${config.databaseServer.port}/blog`
};

// configuration ===============================================================
mongoose.connect(databaseServer.url).then(() => {
  console.log('connected to mongodb');
}).catch((e) => {
  console.error(e);
});

// 라우터 설정
router.use('/api', api.routes());

// 라우터 적용전에, bodyParser 적용
app.use(bodyParser());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

app.listen(config.webServer.port, () => {
  console.log('listening to port' + config.webServer.port);
});