import React from 'react'
import {
    NavBar,
    InputItem,
    TextareaItem,
    Button
} from 'antd-mobile'
import {
    connect
} from 'react-redux'
import {
    Redirect
} from 'react-router-dom'
import {
    update
} from '../../redux/user.redux'
import AvatarSelector from '../../component/avatarSelector/avatarSelector'
@connect(state => state.user, {
    update
})
class GeniusInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'avatar': '',
            'desc': '',
            'position': ''
        }
        this.selectAvatar = this.selectAvatar.bind(this)
    }
    onChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    selectAvatar(val) {
        this.setState({
            avatar: val
        })
    }
    render() {
        const path = this.props.location.pathname
        const redirect = this.props.redirectTo
        return (
            <div>
                {
                    redirect && redirect !== path ? <Redirect to={this.props.redirectTo}/> : null
                }
                <NavBar mode = "dark">牛人完善信息</NavBar>
                <AvatarSelector selectAvatar={this.selectAvatar}></AvatarSelector>
                <InputItem onChange={(v)=>this.onChange('position',v)}>求职岗位</InputItem>
                <TextareaItem 
                    onChange={(v)=>this.onChange('desc',v)}
                    row={3}
                    autoHeight
                    title='个人简介'
                ></TextareaItem>
                <Button
                    onClick={()=>this.props.update(this.state)} 
                    type='primary'>保存</Button>
            </div>
        )
    }
}
export default GeniusInfo