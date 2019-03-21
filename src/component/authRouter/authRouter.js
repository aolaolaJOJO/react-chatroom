import React from 'react'
import axios from 'axios'
import {
    loadData
} from '../../redux/user.redux'
import {
    connect
} from 'react-redux'
import {
    withRouter
} from 'react-router-dom'
@withRouter
@connect(
    null, {
        loadData
    }
)
class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return;
        }
        // 获取用户信息
        axios.get('/user/getUserInfo')
            .then(res => {
                if (res.status === 200) {
                    if (res.data.code === 0) {
                        this.props.loadData(res.data.data)
                    } else {
                        this.props.history.push('/login')
                    }
                }
            })
        // 是否登录
        // 现在的url地址 login是不是需要跳转
        // 用户的类型 genius还是boss
        // 用户是否完善信息（选择头像及个人简介）
    }
    render() {
        return null
    }
}

export default AuthRoute