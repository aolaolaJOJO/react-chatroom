import React from 'react'
import {
    connect
} from 'react-redux'
import {
    Result,
    List,
    WhiteSpace,
    Modal
} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {
    clearRedux
} from '../../redux/user.redux'
import {
    Redirect
} from 'react-router-dom'
@connect(
    state => state.user, {
        clearRedux
    }
)

class PersonalCenter extends React.Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        const alert = Modal.alert
        alert('退出登录', '确认退出登录？', [{
            text: '取消',
            onPress: () => console.log('cancel')
        }, {
            text: '确认',
            onPress: () => {
                console.log('退出成功')
                browserCookie.erase('userid')
                this.props.clearRedux()
            }
        }])

        // window.location.href = window.location.href
    }
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        return props.user ? (
            <div>
                <Result
                    img={<img src={require(`../images/${props.avatar}.png`)} alt=''/>}
                    title={props.user}
                    message={props.type==='boss'?props.company:null}
                />
                <List renderHeader={()=>'简介'}>
                    <Item multipleLine>
                        {props.type==='boss'?'招聘'+props.title:'职位：'+props.position}
                    </Item>
                    <Item>
                        {props.type==='boss'?'技术要求：':'职业技能：'}
                        {props.type==='boss'?
                            props.promise.split('\n').
                                map(v=>(<Brief key={v}>{v}</Brief>))
                            :props.desc.split('\n').
                                map(v=>(<Brief key={v}>{v}</Brief>))
                        }
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={props.redirectTo}/>
    }
}
export default PersonalCenter