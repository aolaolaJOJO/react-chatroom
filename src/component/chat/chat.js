import React from 'react'
import io from 'socket.io-client'
import {
    InputItem,
    List,
    NavBar,
    Icon,
    Grid
} from 'antd-mobile'
import {
    connect
} from 'react-redux'
import {
    getMsgList,
    sendMsg,
    receiveMsg,
    readMsg
} from '../../redux/chat.redux'
import {
    getChatId
} from '../../util'
// 解决跨域 与后端进行链接
const socket = io('ws://127.0.0.1:9093')
@connect(state => state, {
    getMsgList,
    sendMsg,
    receiveMsg,
    readMsg
})
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'text': '',
            'msg': [],
            'showeEmoji': false
        }
    }
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
    // 离开该路由执行
    componentWillUnmount() {
        // 同步未读消息
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }
    emojiExpand() {
        setTimeout(function() {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    handleSubmit() {
        // socket.emit('sendmsg', {
        //     text: this.state.text
        // })

        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        if (msg) {
            this.props.sendMsg({
                from,
                to,
                msg
            })
        }

        this.setState({
            text: '',
            showeEmoji: false
        })
    }
    render() {
        // console.log(this.props)
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({
                text: v
            }))
        const chatid = getChatId(userid, this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v => chatid === v.chatid)
        return (
            <div>
                <div id='chat-page'>
                    <NavBar 
                        mode='dark'
                        icon={<Icon type="left" />}
                        onLeftClick={() =>{ this.props.history.goBack()}}>
                        {users[userid].name}
                    </NavBar>
                    {
                        chatmsgs.map(v=>{
                           const avatar = require(`../images/${users[v.from].avatar}.png`)
                            return v.from == userid ? (
                                <List key={v._id}>
                                    <List.Item 
                                        thumb={avatar}>
                                        {v.content}
                                    </List.Item>
                                </List>
                            ): (
                                <List key={v._id}>
                                    <List.Item
                                        className='chat-me'
                                        extra={<img src={avatar}/>}>
                                        {v.content}
                                    </List.Item>
                                </List>
                            )
                            // return <p key={v._id}>{v.content}</p>
                        })
                    }
                </div>
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入要发送的内容"
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text: v})
                            }}
                            extra={
                                <div>
                                    <span onClick={()=>{
                                        this.setState(
                                            {
                                                showeEmoji: !this.state.showeEmoji
                                            }
                                        )
                                        this.emojiExpand()
                                    }} style={{marginRight: 10}}>😀</span>
                                    <span onClick={()=>this.handleSubmit()}>发送</span>
                                </div>
                            }> 
                        </InputItem>
                    </List>
                    {this.state.showeEmoji?<Grid 
                        data={emoji}
                        columnNum={9}
                        carouselMaxRow={4}
                        isCarousel={true}
                        onClick={v=>{
                            this.setState({text: this.state.text+v.text})
                        }}
                        />:null}
                </div> <
            /div>
        )
    }
}
export default Chat