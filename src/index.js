const koa = require('koa')
const Router = require('koa-router')
const cors = require('koa-cors')
const static = require('koa-static')
const path = require('path')
const bodyparser = require('koa-body')
const mysql = require('mysql')
const views = require('koa-views')
let app = new koa()
let router = new Router()
const connection = mysql.createConnection({
    host: '124.221.188.77',
    user: 'root',
    password: 'NAna-0218',
    database: 'test'
})
connection.connect()
let sql = "SELECT * FROM user"
let sqladd = "INSERT INTO user(id, name, password, email) VALUE(?,?,?,?)"
let sqlUpadte = "UPDATE user SET name = ? WHERE id = ?"
let sqlAll = "SELECT * FROM user"
let sqlDel = "DELETE FROM user WHERE id = 123"
let sqlParams = ['123', '123', '123', '123']
let sqlUpdateParams = ['666', '1']
// connection.query(sqladd, sqlParams, function(err, results){
//     if(err) throw err
//     console.log('results', results)
// })
// connection.query(sqlUpadte, sqlUpdateParams, function(err, results, fields) {
//     if(err) throw err
//     console.log('results', results)
//     console.log('fields', fields)
// })
// connection.query(sql,function(err, results) {
//     if (err) throw err
//     console.log('results', results)
// })
// connection.query(sqlDel, function(err, results) {
//     if(err) throw err
//     console.log('results', results)
// })
connection.query(sqlAll, function(err, results) {
    if(err) throw err
    console.log('results', results)
})
app.use(cors())
app.use(bodyparser())
app.use(async (ctx, next) => {
    console.log('中间件')
    console.log('query', ctx.query)
    console.log("body", ctx.request.body)
    await next()
})
app.use(views(path.join(__dirname, 'chinese/'), {extension: 'html'}))
app.use(async function(ctx) {
    await ctx.render ('index')
})
router.get('/index', async(ctx, newx) => {
    ctx.body = '首页'
})
router.post('/index', async(ctx, newx) => {
    ctx.body = '首页'
})
.get('/user', async(ctx, next) => {
    ctx.body = '用户'
})

app.use(router.routes())

app.listen(3000, () => {
    console.log('服务器启动')
})
