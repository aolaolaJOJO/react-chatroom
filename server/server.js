const models = require('./model')
const Chat = models.getModel('chat')
const express = require('express')

// 处理post请求
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')
// socket.io和express进行绑定
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket) {
    console.log('用户已经登录')
    socket.on('sendmsg', function(data) {
        const {
            from,
            to,
            msg
        } = data
        const chatid = [from, to].sort().join('_')
        Chat.create({
            chatid,
            from,
            to,
            content: msg
        }, function(err, doc) {
            console.log('doc=' + doc)
            io.emit('receivemsg', Object.assign({}, doc._doc))
        })
    })
})
const userRouter = require('./user')

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)
server.listen(9093, function() {
    console.log('server start');
})