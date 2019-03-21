import React from 'react'
import {
    getUserList
} from '../../redux/chatuser.redux'
import {
    connect
} from 'react-redux'
import UserCard from '../usercard/usercard'
@connect(state => state.chatuser, {
    getUserList
})
class Genius extends React.Component {
    componentDidMount() {
        this.props.getUserList('boss')
    }
    render() {
        return (
            <div style={{marginTop: 30}}>
                <UserCard userlist={this.props.userlist}></UserCard>
            </div>
        )
    }
}

export default Genius