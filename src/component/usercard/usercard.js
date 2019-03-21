import React from 'react'
import {
    PropTypes
} from 'prop-types'
import {
    Card,
    WhiteSpace,
    WingBlank
} from 'antd-mobile'
import {
    withRouter
} from 'react-router-dom'
@withRouter
class UserCard extends React.Component {
    static propTypes = {
        userlist: PropTypes.array.isRequired
    }
    handleClick(v) {
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        return (
            <WingBlank>
                {this.props.userlist.map(v=>(
                    v.avatar?(
                        <div style={{marginBottom: 20}}>
                            <Card
                                key={v._id}
                                onClick={()=>this.handleClick(v)}>
                                {v.type==='boss'?<Card.Header
                                    title={v.user}
                                    thumb={require(`../images/${v.avatar}.png`)}
                                    extra={<span>{v.company}</span>}
                                />:<Card.Header
                                    title={v.user}
                                    thumb={require(`../images/${v.avatar}.png`)}
                                    extra={<span>{v.position}</span>}
                                />}
                                <Card.Body>
                                    {v.type==='genius'? <div>
                                        职业技能：
                                        {v.desc.split('\n').map(d=>(
                                            <p key={d}>{d}</p>
                                        ))}
                                    </div> :null}

                                    {v.type==='boss'? <div>招聘职位:{v.title}</div>:null}
                                    <WhiteSpace/>
                                    {v.type==='boss'? <div>招聘要求:{v.promise}</div>:null}
                                    <WhiteSpace/>
                                    {v.type==='boss'? <div>薪资:{v.money}</div>:null}
                                </Card.Body>
                            </Card>
                        </div>
                    ):null
                ))}
            </WingBlank>
        )
    }
}

export default UserCard