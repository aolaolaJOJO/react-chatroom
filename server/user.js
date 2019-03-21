const express = require('express')
const utility = require('utility')
const Router = express.Router()
const models = require('./model')
const User = models.getModel('user')
const Chat = models.getModel('chat')
const _filter = {
    'pwd': 0,
    '_v': 0
}
// Chat.remove({}, function(e, d) {})
Router.get('/list', function(req, res) {
    // User.remove({
    //     user: 'laoban'
    // }, function(e, d) {})
    const {
        type
    } = req.query
    User.find({
        type
    }, function(err, doc) {
        return res.json({
            code: 0,
            data: doc
        })
    })
})
// 登录功能
Router.post('/login', function(req, res) {
    const {
        user,
        pwd
    } = req.body
    User.findOne({
        user,
        pwd: md5Pwd(pwd)
    }, _filter, function(err, doc) {
        if (!doc) {
            return res.json({
                code: 1,
                msg: '用户名或密码错误'
            })
        } else {
            res.cookie('userid', doc._id)
            return res.json({
                code: 0,
                data: doc,
                msg: '登录成功'
            })
        }
    })
})
// 注册功能
Router.post('/register', function(req, res) {

    const {
        user,
        pwd,
        type
    } = req.body
    User.findOne({
        user
    }, function(err, doc) {
        if (doc) {
            return res.json({
                code: 1,
                msg: '用户名重复'
            })
        } else {
            const userModel = new User({
                user,
                type,
                pwd: md5Pwd(pwd)
            })
            userModel.save(function(e, d) {
                if (e) {
                    return res.json({
                        code: 1,
                        msg: '后端出错了'
                    })
                }
                const {
                    user,
                    type,
                    _id
                } = d
                res.cookie('userid', _id)
                return res.json({
                    code: 0,
                    dara: {
                        user,
                        type,
                        _id
                    }
                })
            })
        }
    })
})
//完善信息功能
Router.post('/update', function(req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return json.jump({
            code: 1
        })
    }
    const body = req.body
    User.findByIdAndUpdate(userid, body, function(err, doc) {
        const data = Object.assign({}, {
            user: doc.user,
            type: doc.type
        }, body)
        return res.json({
            code: 0,
            data
        })
    })
})
Router.get('/getUserInfo', function(req, res) {
    const {
        userid
    } = req.cookies
    if (!userid) {
        return res.json({
            code: 1
        })
    }
    User.findOne({
        _id: userid
    }, _filter, function(err, doc) {
        if (err) {
            return res.json({
                code: 1,
                msg: '后端出错了'
            })
        }
        if (doc) {
            return res.json({
                code: 0,
                data: doc
            })
        }
    })

})
Router.get('/getmsglist', function(req, res) {
    const user = req.cookies.userid
    User.find({}, function(e, userdoc) {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {
                name: v.user,
                avatar: v.avatar
            }
        })
        // '$or':[{from: user, to: user}]
        Chat.find({
            '$or': [{
                from: user
            }, {
                to: user
            }]
        }, function(err, doc) {
            if (!err) {
                return res.json({
                    code: 0,
                    msgs: doc,
                    users: users
                })
            }
        })
    })
})
//读取消息
Router.post('/readmsg', function(req, res) {
    const userid = req.cookies.userid
    const {
        from
    } = req.body
    Chat.update({
            from,
            to: userid
        }, {
            '$set': {
                read: true
            },
        }, {
            'multi': true
        },

        function(err, doc) {
            console.log(doc)
            if (!err) {
                return res.json({
                    code: 0,
                    num: doc.nModified
                })
            }
            return res.json({
                code: 1,
                msg: '修改失败'
            })
        })
})
// 自己拼接加密 防止破译
function md5Pwd(pwd) {
    const salt = 'Lhj_1992_11_28_FLTTXYkh'
    return utility.md5(utility.md5(pwd + salt))
}
module.exports = Router