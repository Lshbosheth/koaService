const koa = require('koa')
const views = require('koa-views')
const cors = require('koa-cors')
const static = require('koa-static')
const path = require('path')
const bodyparser = require('koa-body')
const Router = require('koa-router')
const db = require("./db");

let app = new koa()
let router = new Router()
app.use(cors())
app.use(bodyparser())

app.listen(3000, () => {
    console.log('服务器启动')
})
app.use(router.routes())
router.get("/users", async function(ctx) {
    const users = await db.getAll();
    console.log(users)
    ctx.body = users;
})
