import axios from 'axios'
import io from 'socket.io-client'

const socket = io('ws://127.0.0.1:9093')

// 消息列表
const MSG_LIST = 'MSG_LIST'
// 读取、接收信息
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {
                ...state,
                chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length,
                users: action.payload.users
            }
        case MSG_RECV:
            const un = action.payload.to === action.userid ? 1 : 0
            return {
                ...state,
                chatmsg: [...state.chatmsg, action.payload],
                unread: state.unread + un
            }
        case MSG_READ:
            const {
                from,
                num
            } = action.payload
            return {
                ...state,
                chatmsg: state.chatmsg.map(v => ({
                    ...v,
                    read: from == v.from ? true : v.read
                })),
                unread: state.unread - num
            }
        default:
            return state
    }
}

function msgList(msgs, users, userid) {
    return {
        type: MSG_LIST,
        payload: {
            msgs,
            users,
            userid
        }
    }
}

function msgReceive(msg, userid) {
    return {
        userid,
        type: MSG_RECV,
        payload: msg
    }
}

function msgRead({
    from,
    userid,
    num
}) {
    return {
        type: MSG_READ,
        payload: {
            from,
            userid,
            num
        }
    }
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code == 0) {
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}
// 发送信息
export function sendMsg({
    from,
    to,
    msg
}) {
    return dispatch => {
        socket.emit('sendmsg', {
            from,
            to,
            msg
        })
    }
}
// 接收信息
export function receiveMsg() {
    return (dispatch, getState) => {
        socket.on('receivemsg', function(data) {
            const userid = getState().user._id
            dispatch(msgReceive(data, userid))
        })
    }
}
// 读取信息情况
export function readMsg(from) {
    return (dispatch, getState) => {
        axios.post('/user/readmsg', {
                from
            })
            .then(res => {
                const userid = getState().user._id
                if (res.status === 200) {
                    dispatch(msgRead({
                        userid,
                        from,
                        num: res.data.num
                    }))
                }
            })
    }
}