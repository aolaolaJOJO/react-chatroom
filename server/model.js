const mongoose = require('mongoose')
// 链接mongodb数据库
const DB_URL = 'mongodb://127.0.0.1:27017';
mongoose.connect(DB_URL);

const models = {
    user: {
        'user': {
            'type': String,
            'require': true
        },
        'pwd': {
            'type': String,
            'require': true
        },
        'type': {
            'type': String,
            'require': true
        },
        // 头像
        'avatar': {
            'type': String
        },
        // 简介
        'desc': {
            'type': String
        },
        // 职位名
        'title': {
            'type': String
        },
        // 若果是boss 还有以下两个字段
        'company': {
            'type': String
        },
        'money': {
            'type': String
        },
        'position': {
            'type': String
        },
        'promise': {
            'type': String
        }
    },
    chat: {
        'chatid': {
            'type': String,
            'require': true
        },
        // 已读消息
        'read': {
            'type': Boolean,
            'default': false
        },
        // 从哪里发来的消息
        'from': {
            'type': String,
            'require': true
        },
        // 发送给谁
        'to': {
            'type': String,
            'require': true
        },
        // 发送的内容
        'content': {
            'type': String,
            'require': true,
            'default': ''
        },
        // 创建发送时间
        'create_time': {
            'type': Number,
            'default': Date.now
        }
    }
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}
mongoose.connection.on('connected', function() {
    console.log('mongo connect success');
});