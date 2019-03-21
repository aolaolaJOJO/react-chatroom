import React from 'react'
import Logo from '../../component/logo/logo'
import {
    login
} from '../../redux/user.redux'
import {
    Redirect
} from 'react-router-dom'
import {
    connect
} from 'react-redux'
import {
    List,
    InputItem,
    WingBlank,
    WhiteSpace,
    Button
} from 'antd-mobile'
// 高阶组件 属性代理和反向继承 
import hocPackage from '../../component/hocpackage/hocpackage'
@connect(state => state.user, {
    login
})


@hocPackage
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
        // this.state = {
        //     'user': '',
        //     'pwd': ''
        // }
    }
    register() {
        this.props.history.push('./register');
    }
    handleLogin(key, val) {
        this.props.login(this.props.state)
    }
    // handleChange(key, val) {
    //     this.setState({
    //         [key]: val
    //     })
    // }
    render() {
        return (
            <div>
                {this.props.redirectTo && this.props.redirectTo !== '/login'?<Redirect to={this.props.redirectTo}/>:null}
                <Logo></Logo>
                <WingBlank>
                    {this.props.msg?<p className='errorMsg'>{this.props.msg}</p>:''}
                    <List>
                        <InputItem
                            onChange={v=>this.props.handleChange('user', v)}>用户</InputItem>
                        <InputItem
                            type='password'
                            onChange={v=>this.props.handleChange('pwd', v)}>密码</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button onClick={this.handleLogin} type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.register} type='primary'>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login