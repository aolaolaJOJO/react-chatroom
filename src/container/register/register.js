import React from 'react'
import Logo from '../../component/logo/logo'
import {
    List,
    InputItem,
    WingBlank,
    Radio,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {
    Redirect
} from 'react-router-dom'
import {
    connect
} from 'react-redux'
import {
    register
} from '../../redux/user.redux'
// 高阶组件 属性代理和反向继承 
import hocPackage from '../../component/hocpackage/hocpackage'
@connect(state => state.user, {
    register
})
@hocPackage
class Register extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     user: '',
        //     pwd: '',
        //     repeatpwd: '',
        //     type: 'genius'
        // }
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount() {
        this.props.handleChange('type', 'genius')
    }
    handleRegister() {
        this.props.register(this.props.state)
        // console.log(this.props.redirectTo)
    }
    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }
    render() {
        const RadioItem = Radio.RadioItem
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    {this.props.msg?<p className='errorMsg'>{this.props.msg}</p>:''}
                    <List>
                        <InputItem
                            onChange={v=>this.props.handleChange('user', v)}>用户名</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('pwd', v)}>密码</InputItem>
                        <WhiteSpace/>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
                        <WhiteSpace/>
                        <RadioItem 
                            checked={this.props.state.type==='genius'}
                            onChange={v=>this.props.handleChange('type', 'genius')}>
                            牛人
                        </RadioItem>
                        <RadioItem 
                            checked={this.props.state.type==='boss'}
                            onChange={v=>this.props.handleChange('type', 'boss')}>
                            Boss
                        </RadioItem>
                    </List>
                    <Button style={{marginTop: 30}} onClick={this.handleRegister} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Register