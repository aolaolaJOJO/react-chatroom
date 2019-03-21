import React from 'react'
import {
    connect
} from 'react-redux'
import {
    NavBar
} from 'antd-mobile'
import {
    Route,
    Switch
} from 'react-router-dom'

import Boss from '../boss/boss'
import Genius from '../genius/genius'
import PersonalCenter from '../personalcenter/personalcenter'
import NavLinkBar from '../navlink/navlink'
import Msg from '../msg/msg'
import {
    getMsgList,
    receiveMsg
} from '../../redux/chat.redux'

@connect(
    state => state, {
        getMsgList,
        receiveMsg
    }
)
class Dashboard extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.receiveMsg()
        }
        // socket.on('receivemsg', (data) => {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }
    render() {
        const {
            pathname
        } = this.props.location
        const user = this.props.user
        const navList = [{
            path: '/boss',
            text: '牛人',
            icon: 'boss',
            title: '牛人列表',
            component: Boss,
            hide: user.type === 'genius'
        }, {
            path: '/genius',
            text: 'boss',
            icon: 'genius',
            title: 'boss列表',
            component: Genius,
            hide: user.type === 'boss'
        }, {
            path: '/msg',
            text: '消息',
            icon: 'msg',
            title: '消息列表',
            component: Msg
        }, {
            path: '/personalcenter',
            text: '我',
            icon: 'personalcenter',
            title: '个人中心',
            component: PersonalCenter
        }]

        return (
            <div>
                {navList.find(v=>v.path===pathname)?<NavBar mode='dark'>{navList.find(v=>v.path===pathname).title}</NavBar>:''}
                <Switch>
                    {navList.map(v=>(
                        <Route key={v.path} path={v.path} component={v.component}></Route>
                    ))}
                </Switch>
                {/*<Route path='/boss' component={Boss}></Route>
                <Route path='/genius' component={Genius}></Route>*/}
                <div style={{position: 'fixed', bottom: 0, width: '100%'}}>
                    <NavLinkBar data={navList}></NavLinkBar>
                </div> 
            </div>
        )
    }
}

export default Dashboard