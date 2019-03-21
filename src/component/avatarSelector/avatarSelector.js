import React from 'react'
import {
    List,
    Grid
} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func
    }
    constructor(props) {
        super(props)
        this.state = {
            'icon': '',
            'text': ''
        }
    }
    render() {
        const avatarList = 'boy,man,girl,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
            .split(',')
            .map(v => ({
                icon: require(`../images/${v}.png`),
                text: v
            }))
        const gridHeader = this.state.icon ?
            (<div>
                <span>已选择头像</span>
                <img style={{width:20}} src={this.state.icon} alt=''/>
            </div>) : <div>请选择头像</div>
        return (
            <div>
                <List renderHeader={()=>gridHeader}>
                    <Grid 
                        data={avatarList} 
                        columnNum={5} 
                        onClick={elm=>{
                            this.setState(elm)
                            this.props.selectAvatar(elm.text)
                        }}/>
                </List>
                
            </div>
        )
    }
}
export default AvatarSelector